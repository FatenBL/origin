const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || main_db,
  port: process.env.DB_PORT,
});
db.connect((err) => {
  if (err) {
    console.log("erreur de connexion a sql!", err);
  } else {
    console.log("Connexion réussie à la base de données MySQL.");

    //init tables
    // print messsage
  }
});
module.exports = db;
