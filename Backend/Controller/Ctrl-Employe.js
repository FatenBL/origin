const { createTables } = require("../Model/Personne");
const bcrypt = require("bcrypt");
const db = require("../config");
const jwt = require("jsonwebtoken");
createTables();

const creerToken = (nom, prenom) => {
  if (!process.env.SECRET) {
    throw new Error("Clé secrète JWT manquante");
  }
  return jwt.sign({ nom, prenom }, process.env.SECRET, { expiresIn: "1d" });
};

const hashMotPasse = (password) => {
  const saltRound = 10;
  return bcrypt.hash(password, saltRound);
};

const ajouterEmploye = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, telephone, poste } = req.body;
    if (mot_de_passe.length < 8) {
      return res.status(400).json({
        message: "Le mot de passe doit comporter au moins 8 caractères.",
      });
    }

    const checkEmailSql = "SELECT * FROM Personne WHERE email = ?";
    const [existant] = await db.promise().query(checkEmailSql, [email]);
    if (existant.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedMotPasse = await hashMotPasse(mot_de_passe);
    const insertPersonneSql =
      "INSERT INTO Personne (nom, prenom, email, mot_de_passe, telephone, role) VALUES (?, ?, ?, ?, ?, 'Employe')";
    const [personne] = await db
      .promise()
      .query(insertPersonneSql, [
        nom,
        prenom,
        email,
        hashedMotPasse,
        telephone,
      ]);

    const insertEmployeSql =
      "INSERT INTO Employe (id_personne, poste) VALUES (?, ?)";
    await db.promise().query(insertEmployeSql, [personne.insertId, poste]);

    return res.status(201).json({ message: "Employé ajouté avec succès" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

const affichierEmployes = async (req, res) => {
  try {
    const sql = `SELECT Employe.idE, Personne.nom, Personne.prenom, Personne.email, Personne.telephone, Employe.poste 
                 FROM Employe JOIN Personne ON Employe.id_personne = Personne.id`;
    const [employes] = await db.promise().query(sql);
    return res.json(employes);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération des employés" });
  }
};
//Delete employe
const supprimerEmploye = async (req, res) => {
  try {
    const { idE } = req.params;

    // Vérification si l'employé existe
    const employeSql = "SELECT * FROM Employe WHERE idE = ?";
    const [employe] = await db.promise().query(employeSql, [idE]);

    if (employe.length === 0) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Récupération de l'id_personne pour suppression dans la table Personne
    const idPersonne = employe[0].id_personne;

    // Suppression de l'employé dans la table Employe
    const deleteEmployeSql = "DELETE FROM Employe WHERE idE = ?";
    await db.promise().query(deleteEmployeSql, [idE]);

    // Suppression de la personne dans la table Personne
    const deletePersonneSql = "DELETE FROM Personne WHERE id = ?";
    await db.promise().query(deletePersonneSql, [idPersonne]);

    return res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'employé:", err);
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'employé" });
  }
};
const chargerInfoEmploye = async (req, res) => {
  try {
    const { idE } = req.params;

    // Vérification si l'employé existe
    const employeSql = "SELECT * FROM Employe WHERE idE = ?";
    const [employe] = await db.promise().query(employeSql, [idE]);

    if (employe.length === 0) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Récupération des informations de la personne associée
    const idPersonne = employe[0].id_personne;
    const personneSql = "SELECT * FROM Personne WHERE id = ?";
    const [personne] = await db.promise().query(personneSql, [idPersonne]);

    if (personne.length === 0) {
      return res.status(404).json({ message: "Personne associée non trouvée" });
    }

    // Fusionner les informations de l'employé et de la personne
    const employeDetails = {
      idE: employe[0].idE,
      nom: personne[0].nom,
      prenom: personne[0].prenom,
      email: personne[0].email,
      telephone: personne[0].telephone,
      poste: employe[0].poste,
    };

    return res.status(200).json(employeDetails);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des informations de l'employé:",
      err
    );
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération des informations" });
  }
};

const changerInfoEmploye = async (req, res) => {
  try {
    const { idE } = req.params;
    const data = req.body;

    // Vérifier si des données ont été envoyées
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Aucune donnée à mettre à jour" });
    }

    // Vérifier si l'employé existe
    const employeSql = "SELECT * FROM Employe WHERE idE = ?";
    const [employe] = await db.promise().query(employeSql, [idE]);

    if (employe.length === 0) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Mise à jour de la table Personne (si les champs sont fournis)
    if (data.nom || data.prenom || data.email || data.telephone) {
      const updatePersonneSql = `
        UPDATE Personne 
        SET 
          nom = COALESCE(?, nom), 
          prenom = COALESCE(?, prenom), 
          email = COALESCE(?, email), 
          telephone = COALESCE(?, telephone) 
        WHERE id = ?
      `;
      await db.promise().query(updatePersonneSql, [
        data.nom || null,
        data.prenom || null,
        data.email || null,
        data.telephone || null,
        employe[0].id_personne, // Récupération de l'id_personne depuis l'employé existant
      ]);
    }

    // Mise à jour de la table Employe (si le champ `poste` est fourni)
    if (data.poste) {
      const updateEmployeSql = "UPDATE Employe SET poste = ? WHERE idE = ?";
      await db.promise().query(updateEmployeSql, [data.poste, idE]);
    }

    return res
      .status(200)
      .json({ message: "L'employé a été mis à jour avec succès" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'employé:", err);
    return res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'employé" });
  }
};

const authentifierEmploye = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const sql = `SELECT Personne.*, Employe.idE, Employe.poste FROM Employe 
                 JOIN Personne ON Employe.id_personne = Personne.id 
                 WHERE Personne.email = ?`;

    const [users] = await db.promise().query(sql, [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    const utilisateur = users[0];
    const isMatch = await bcrypt.compare(
      mot_de_passe,
      utilisateur.mot_de_passe
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = creerToken(utilisateur.nom, utilisateur.prenom);
    return res.status(200).json({
      message: "Authentification réussie",
      role: "Employe",
      utilisateur: { ...utilisateur, token },
    });
  } catch (err) {
    return res.status(500).json({ error: "Erreur lors de l'authentification" });
  }
};

module.exports = {
  ajouterEmploye,
  affichierEmployes,
  supprimerEmploye,
  chargerInfoEmploye,
  changerInfoEmploye,
  authentifierEmploye,
};
