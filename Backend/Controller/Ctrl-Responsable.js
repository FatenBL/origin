const bcrypt = require("bcrypt");
const db = require("../config");
const jwt = require("jsonwebtoken"); // Importation de JWT

// Fonction pour créer un token
const creerToken = (nom, prenom) => {
  if (!process.env.SECRET) {
    throw new Error("Clé secrète JWT manquante");
  }

  try {
    // Génère un token avec nom et prénom
    return jwt.sign({ nom, prenom }, process.env.SECRET, { expiresIn: "1d" });
  } catch (err) {
    // Capture toute autre erreur
    throw new Error("Erreur lors de la génération du token");
  }
};

// Fonction pour ajouter un responsable
const ajouterResponsable = (req, res) => {
  const { nom, prenom, email, mot_de_passe, telephone, role } = req.body;

  // Hachage du mot de passe avant l'insertion
  bcrypt.hash(mot_de_passe, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Erreur lors du hachage du mot de passe :", err);
      return res.status(500).send("Erreur lors du hachage du mot de passe.");
    }

    // Ajout de la personne
    const sqlPersonne = `
      INSERT INTO Personne (nom, prenom, email, mot_de_passe, telephone, role)
      VALUES (?, ?, ?, ?, ?, 'Responsable')
    `;

    db.query(
      sqlPersonne,
      [nom, prenom, email, hashedPassword, telephone],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion de la personne :", err);
          return res.status(500).send("Erreur lors de l'ajout de la personne.");
        }

        const personId = result.insertId;

        // Ajout du responsable
        const sqlResponsable = `
        INSERT INTO Responsable (id_personne)
        VALUES (?)
      `;

        db.query(sqlResponsable, [personId], (err) => {
          if (err) {
            console.error("Erreur lors de l'ajout du responsable :", err);
            return res
              .status(500)
              .send("Erreur lors de l'ajout du responsable.");
          }

          console.log("Responsable ajouté avec succès.");
          res.status(201).send({
            message: "Responsable ajouté avec succès",
            id_personne: personId,
          });
        });
      }
    );
  });
};

// Supprimer un responsable
const supprimerResponsable = async (req, res) => {
  try {
    const { idR } = req.params; // On récupère l'id du responsable à supprimer

    // Vérification si le responsable existe dans la table Responsable
    const responsableSql = "SELECT * FROM Responsable WHERE idR = ?";
    const [responsable] = await db.promise().query(responsableSql, [idR]);

    if (responsable.length === 0) {
      return res.status(404).json({ message: "Responsable non trouvé" });
    }

    // Suppression du responsable dans la table Responsable
    const deleteResponsableSql = "DELETE FROM Responsable WHERE idR = ?";
    await db.promise().query(deleteResponsableSql, [idR]);

    // Suppression de la personne associée dans la table Personne
    const deletePersonneSql = "DELETE FROM Personne WHERE id = ?";
    await db.promise().query(deletePersonneSql, [responsable[0].id_personne]);

    return res
      .status(200)
      .json({ message: "Responsable supprimé avec succès" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

// Fonction d'authentification responsable
const authentifierResponsable = (req, res) => {
  const { email, mot_de_passe } = req.body;

  const sql = "SELECT * FROM Personne WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }

    if (result.length > 0) {
      const utilisateur = result[0];

      // Vérification du mot de passe
      bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe, (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la comparaison des mots de passe" });
        }

        if (isMatch) {
          // Génère un token avec nom et prénom de l'utilisateur
          try {
            const token = creerToken(utilisateur.nom, utilisateur.prenom);

            // Vérification si la personne est un responsable
            const sqlResponsable =
              "SELECT * FROM Responsable WHERE id_personne = ?";
            db.query(sqlResponsable, [utilisateur.id], (err, result) => {
              if (err) {
                return res.status(500).json({
                  error: "Erreur lors de la recherche du responsable",
                });
              }

              if (result.length > 0) {
                return res.status(200).json({
                  message: "Authentification réussie",
                  role: "responsable",
                  utilisateur: {
                    ...utilisateur,
                    token: token, // Ajoute le token généré
                  },
                });
              } else {
                return res
                  .status(403)
                  .json({ error: "Vous n'êtes pas un responsable" });
              }
            });
          } catch (tokenError) {
            return res
              .status(500)
              .json({ error: "Erreur lors de la génération du token" });
          }
        } else {
          return res
            .status(401)
            .json({ error: "Email ou mot de passe incorrect" });
        }
      });
    } else {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
  });
};

module.exports = {
  ajouterResponsable,
  supprimerResponsable,
  authentifierResponsable,
};
