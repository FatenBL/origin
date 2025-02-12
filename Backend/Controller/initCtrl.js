const { createTable: createUserTable } = require("../Model/Utilisateur");
// Si tu as d'autres modèles avec des fonctions de création de tables, importe-les ici
// const { createTable: createOtherTable } = require('../models/anotherModel');

const initCtrl = async (req, res) => {
  try {
    console.log("Début de la création des tables...");

    await createUserTable();
    console.log("Table utilisateurs créée.");

    res.send("Toutes les tables ont été créées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création des tables:", error);
    res.status(500).send("Erreur lors de la création des tables.");
  }
};

module.exports = initCtrl;
