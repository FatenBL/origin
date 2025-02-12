const express = require("express");
const db = require("./config");
const routeEmploye = require("./Routes/routeEmploye");
const routeResponsable = require("./Routes/routeResponsable");
const routeProjet = require("./Routes/routeProjet");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//// Middleware pour analyser les données au format JSON
app.use(bodyParser.json());

app.use(express.json());
app.use("/Employe", routeEmploye);
app.use("/Responsable", routeResponsable);
app.use("/Projet", routeProjet);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
