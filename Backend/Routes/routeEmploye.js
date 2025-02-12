const express = require("express");
const ctrlEmploye = require("../Controller/Ctrl-Employe");
const router = express.Router();
router.post("/ajouter", ctrlEmploye.ajouterEmploye);
router.get("/employes", ctrlEmploye.affichierEmployes);
router.delete("/supprimer/:idE", ctrlEmploye.supprimerEmploye);
router.get("/affichierInfoEmploye/:idE", ctrlEmploye.chargerInfoEmploye);
router.put("/mise_A_Jour/:idE", ctrlEmploye.changerInfoEmploye);

router.post("/authentifier", ctrlEmploye.authentifierEmploye);
module.exports = router;
