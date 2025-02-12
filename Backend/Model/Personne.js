const mysql = require("mysql2");
const db = require("../config");

const createTables = () => {
  // Création de la table Personne
  const sqlPersonne = `
    CREATE TABLE IF NOT EXISTS Personne (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nom VARCHAR(100) NOT NULL,
      prenom VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      mot_de_passe VARCHAR(255) NOT NULL,
      telephone VARCHAR(20) NOT NULL,
      role ENUM('Employe', 'Responsable') NOT NULL DEFAULT 'Employe',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(sqlPersonne, (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table Personne :", err);
    } else {
      console.log("Table Personne créée avec succès.");

      // Création de la table Employe
      const sqlEmploye = `
        CREATE TABLE IF NOT EXISTS Employe (
          idE INT AUTO_INCREMENT PRIMARY KEY,
          id_personne INT NOT NULL,
          poste VARCHAR(100) NOT NULL, 
          FOREIGN KEY (id_personne) REFERENCES Personne(id) ON DELETE CASCADE

        )
      `;
      db.query(sqlEmploye, (err) => {
        if (err) {
          console.error(
            "Erreur lors de la création de la table Employe :",
            err
          );
        } else {
          console.log("Table Employe créée avec succès.");
        }
      });

      // Création de la table Responsable
      const sqlResponsable = `
        CREATE TABLE IF NOT EXISTS Responsable (
          idR INT AUTO_INCREMENT PRIMARY KEY,
          id_personne INT NOT NULL,
          FOREIGN KEY (id_personne) REFERENCES Personne(id) ON DELETE CASCADE
        )
      `;
      db.query(sqlResponsable, (err) => {
        if (err) {
          console.error(
            "Erreur lors de la création de la table Responsable :",
            err
          );
        } else {
          console.log("Table Responsable créée avec succès.");
        }
      });
    }
  });
};

module.exports = { createTables };
