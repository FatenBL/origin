const mysql = require("mysql2");
const db = require("../config");
const createTable = () => {
  const sql = `
CREATE TABLE IF NOT EXISTS Responsable(
idR INT AUTO_INCREMENT PRIMARY KEY,
nom VARCHAR(50) NOT NULL,
prenom VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
mot_de_passe VARCHAR(50) NOT NULL,
telephone INT(20) NOT NULL

)`;
  db.query(sql, (err, resultat) => {
    if (err) {
      console.error(
        "Erreur lors de la création de la table Responsable :",
        err
      );
    } else {
      console.log("Table responsable créée avec succès.");
    }
  });
};

module.exports = { createTable };
