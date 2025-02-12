import React, { useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLoginResponsable } from "./hooks/useLoginResponsable";
import { useLoginEmploye } from "./hooks/useLoginEmploye";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AuthResponsableEmploye() {
  // États pour gérer les entrées utilisateur et l'erreur
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [error, setError] = useState(""); // Ajout d'un état pour l'erreur
  const navigate = useNavigate();
  const { login, isLoading } = useLoginResponsable(); // Import du hook
  const { loginE } = useLoginEmploye(); // Import du hook

  // Fonction pour l'authentification responsable
  async function handleSubmitR(event) {
    event.preventDefault();
    setError(""); // Réinitialiser l'erreur avant chaque tentative
    try {
      const data = await login(email, mot_de_passe);
      console.log("Connexion réussie :", data.email, data.mot_de_passe);
      navigate("/AcceuilResponsable"); // Redirection après authentification réussie
    } catch (err) {
      setError("Identifiants incorrects"); // Affichage de l'erreur
    }
  }

  // Fonction pour l'authentification employé
  async function handleSubmitE(event) {
    event.preventDefault();
    setError(""); // Réinitialiser l'erreur avant chaque tentative
    try {
      const data = await loginE(email, mot_de_passe);
      console.log("Connexion réussie :", data.email, data.mot_de_passe);
      navigate("/AcceuilEmploye"); // Redirection après authentification réussie
    } catch (err) {
      setError("Identifiants incorrects pour l'employé"); // Affichage de l'erreur
    }
  }

  // Fonction de basculement entre les vues Responsable et Employé
  function SwitchContent(event) {
    const content = document.getElementById("content");
    if (event.target.id === "employe") {
      content.classList.add("active");
    } else if (event.target.id === "responsable") {
      content.classList.remove("active");
    }
  }

  return (
    <div
      className="content justify-content-center align-items-center d-flex shadow-lg"
      id="content"
    >
      {/* Formulaire Authentification Responsable */}
      <div className="col-md-6 right-box justify-content-center">
        <form onSubmit={handleSubmitR}>
          <div className="header-text mb-4">
            <h1>Se connecter Responsable</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="form-control form-control-lg bg-light fs-6"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Mot de passe"
              value={mot_de_passe}
              className="form-control form-control-lg bg-light fs-6"
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button className="btn border-white text-white w-60 fs-6">
              Se connecter
            </button>
          </div>
        </form>
      </div>

      {/* Affichage des erreurs */}
      {error && <div className="error-message ">{error}</div>}

      {/* Formulaire Authentification Employé */}
      <div className="col-md-6 right-box justify-content-center">
        <form onSubmit={handleSubmitE}>
          <div className="header-text mb-4">
            <h1>Se connecter Employé</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="form-control form-control-lg bg-light fs-6"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Mot de passe"
              value={mot_de_passe}
              className="form-control form-control-lg bg-light fs-6"
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button className="btn border-white text-white w-60 fs-6">
              Se connecter
            </button>
          </div>
        </form>
      </div>

      {/* Affichage des erreurs */}
      {error && <div className="error-message ">{error}</div>}

      {/* Switch Panel */}
      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-left">
            <h1>Bienvenue</h1>
            <p>
              Accédez à la plateforme et gérez vos tâches de manière simplifiée
              et efficace.
            </p>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="responsable"
              onClick={SwitchContent}
            >
              Employé
            </button>
          </div>
          <div className="switch-panel switch-right">
            <h1>Bienvenue</h1>
            <p>
              Accédez à la plateforme et gérez vos tâches de manière simplifiée
              et efficace.
            </p>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="employe"
              onClick={SwitchContent}
            >
              Responsable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthResponsableEmploye;
