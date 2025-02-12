const express = require("express");
const ctrlProjet = require("../Controller/Ctrl-Projet");
const router = express.Router();
router.post("/ajouterProjet", ctrlProjet.ajouterProjet);
router.put("/modifierProjet/:idP", ctrlProjet.modifierProjet);
router.delete("/supprimerProjet/:idP", ctrlProjet.supprimerProjet);
router.get("/affichierProjet", ctrlProjet.affichierProjet);
module.exports = router;
