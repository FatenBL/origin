const mysql = require("mysql2");
const db = require("../config");

// Créer la table utilisateurs (si elle n'existe pas déjà)
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS Employe (
      idE INT AUTO_INCREMENT PRIMARY KEY,
      nom VARCHAR(100) NOT NULL,
      prenom VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      mot_de_passe VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de la création de la table Employes :", err);
    } else {
      console.log("Table Employes créée avec succès.");
    }
  });
};

// Exposer les fonctions pour qu'elles soient accessibles ailleurs
module.exports = {
  createTable,
};
