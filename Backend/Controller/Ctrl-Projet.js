const { createTable } = require("../Model/Projet");
const db = require("../config");
createTable();
// Ajouter un projet
const ajouterProjet = (req, res) => {
  try {
    const { nom, description, dateDebut, dateFin, statut, idR } = req.body;

    // Vérifier que toutes les données requises sont fournies
    if (!nom || !description || !dateDebut || !dateFin || !statut || !idR) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const sql = `INSERT INTO Projet (nom, description, dateDebut, dateFin, Statut, idR) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [nom, description, dateDebut, dateFin, statut, idR],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de l'ajout du projet :", err);
          return res
            .status(500)
            .json({ message: "Erreur serveur lors de l'ajout du projet." });
        }
        res.status(201).json({
          message: "Projet ajouté avec succès.",
          idP: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Erreur dans ajouterProjet :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
// Modifier un projet
const modifierProjet = (req, res) => {
  try {
    const { idP } = req.params; // Récupérer l'ID du projet depuis les paramètres de l'URL
    const { nom, description, dateDebut, dateFin, statut, idR } = req.body;

    // Vérifier que l'ID du projet est fourni
    if (!idP) {
      return res.status(400).json({ message: "L'ID du projet est requis." });
    }

    // Vérifier que les données sont fournies pour la mise à jour
    if (!nom && !description && !dateDebut && !dateFin && !statut && !idR) {
      return res
        .status(400)
        .json({ message: "Aucune donnée à mettre à jour." });
    }

    // Vérifier si le projet existe
    const sqlCheckProjet = `SELECT * FROM Projet WHERE idP = ?`;

    db.query(sqlCheckProjet, [idP], (err, result) => {
      if (err) {
        console.error("Erreur lors de la vérification du projet :", err);
        return res.status(500).json({
          message: "Erreur serveur lors de la vérification du projet.",
        });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Aucun projet trouvé avec cet ID." });
      }

      // Mettre à jour les informations du projet
      const sqlUpdateProjet = `UPDATE Projet SET 
          nom = COALESCE(?, nom),
          description = COALESCE(?, description),
          dateDebut = COALESCE(?, dateDebut),
          dateFin = COALESCE(?, dateFin),
          Statut = COALESCE(?, Statut),
          idR = COALESCE(?, idR)
          WHERE idP = ?`;

      db.query(
        sqlUpdateProjet,
        [nom, description, dateDebut, dateFin, statut, idR, idP],
        (err, result) => {
          if (err) {
            console.error("Erreur lors de la mise à jour du projet :", err);
            return res.status(500).json({
              message: "Erreur serveur lors de la mise à jour du projet.",
            });
          }

          res.status(200).json({ message: "Projet mis à jour avec succès." });
        }
      );
    });
  } catch (error) {
    console.error("Erreur dans modifierProjet :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Supprimer un projet
const supprimerProjet = (req, res) => {
  try {
    const { idP } = req.params; // Récupérer l'ID du projet depuis les paramètres de l'URL

    // Vérifier que l'ID du projet est fourni
    if (!idP) {
      return res.status(400).json({ message: "L'ID du projet est requis." });
    }

    // Vérifier si le projet existe avant de le supprimer
    const sqlCheckProjet = `SELECT * FROM Projet WHERE idP = ?`;

    db.query(sqlCheckProjet, [idP], (err, result) => {
      if (err) {
        console.error("Erreur lors de la vérification du projet :", err);
        return res.status(500).json({
          message: "Erreur serveur lors de la vérification du projet.",
        });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Aucun projet trouvé avec cet ID." });
      }

      // Supprimer le projet
      const sqlDeleteProjet = `DELETE FROM Projet WHERE idP = ?`;

      db.query(sqlDeleteProjet, [idP], (err, result) => {
        if (err) {
          console.error("Erreur lors de la suppression du projet :", err);
          return res.status(500).json({
            message: "Erreur serveur lors de la suppression du projet.",
          });
        }

        res.status(200).json({ message: "Projet supprimé avec succès." });
      });
    });
  } catch (error) {
    console.error("Erreur dans supprimerProjet :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
//affichier toutes les projet
const affichierProjet = (req, res) => {
  try {
    const sql = "SELECT * FROM Projet"; // Requête pour récupérer tous les projets

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Erreur lors de la récupération des projets :", err);
        return res.status(500).json({
          message: "Erreur serveur lors de la récupération des projets.",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Aucun projet trouvé." });
      }

      // Renvoi des projets récupérés
      res.status(200).json({
        message: "Projets récupérés avec succès.",
        projets: result, // Résultat de la requête
      });
    });
  } catch (error) {
    console.error("Erreur dans afficherProjet :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = {
  ajouterProjet,
  modifierProjet,
  supprimerProjet,
  affichierProjet,
};
