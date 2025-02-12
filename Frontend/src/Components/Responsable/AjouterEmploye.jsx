import React, { useState } from "react";
import axios from "axios";
import "../../AppAjoutEmp.css";

function AjouterEmploye() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [poste, setPoste] = useState(""); // Ajout du champ poste
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    axios
      .post("http://localhost:3000/Employe/ajouter", {
        nom,
        prenom,
        email,
        mot_de_passe,
        telephone,
        poste, // Ajout du poste
        headers: { "Content-Type": "application/json" }, // Ajout du header
      })
      .then(() => {
        setMessage("Employé ajouté avec succès !");
        setNom("");
        setPrenom("");
        setEmail("");
        setMotDePasse("");
        setTelephone("");
        setPoste(""); // Réinitialisation du champ poste
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Une erreur est survenue.");
      });
  }

  return (
    <div
      style={{
        backgroundImage: `url("/BackAjout.jpeg")`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <form className="form-Ajout" onSubmit={handleSubmit}>
        <h2>Ajouter employé</h2>
        <div>
          <label>Nom :</label>
          <br />
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <br />
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <br />
          <input
            type="password"
            placeholder="Mot de passe"
            value={mot_de_passe}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Téléphone :</label>
          <br />
          <input
            type="tel"
            placeholder="Téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Poste :</label>
          <br />
          <input
            type="text"
            placeholder="Poste"
            value={poste}
            onChange={(e) => setPoste(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button className="btnA" type="submit">
            Ajouter
          </button>
        </div>
        {message && (
          <p
            className={`message ${
              message.includes("succès") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AjouterEmploye;
