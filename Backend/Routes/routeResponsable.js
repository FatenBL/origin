const express = require("express");
const ctrlResponsable = require("../Controller/Ctrl-Responsable");
const router = express.Router();
router.post("/ajouterResponsable", ctrlResponsable.ajouterResponsable);
router.delete(
  "/supprimerResponsable/:idR",
  ctrlResponsable.supprimerResponsable
);
router.post("/authentifier", ctrlResponsable.authentifierResponsable);
module.exports = router;
