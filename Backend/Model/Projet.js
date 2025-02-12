const mysql = require("mysql2");
const db = require("../config");

const createTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS Projet(
    idP INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(80) NOT NULL,
    description VARCHAR(250) NOT NULL,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    Statut ENUM('À faire', 'En cours', 'Terminé') NOT NULL,
    idR INT NOT NULL,
    FOREIGN KEY (idR) REFERENCES Responsable(idR)
  )`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de la création de la table Projet :", err);
    } else {
      console.log("Table Projet créée avec succès.");
    }
  });
};

// Exposer la fonction
module.exports = {
  createTable,
};
