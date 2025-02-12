import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLoginResponsable = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, mot_de_passe) => {
    try {
      console.log("Données envoyées :", { email, mot_de_passe }); // Log des données envoyées

      const response = await fetch(
        "http://localhost:3000/Responsable/authentifier",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, mot_de_passe }),
        }
      );

      const json = await response.json();

      console.log("Réponse du serveur :", json); // Log de la réponse du serveur

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        return; // Ajout du return ici pour quitter la fonction en cas d'erreur
      }

      if (response.ok) {
        // Sauvegarder l'utilisateur dans localStorage
        localStorage.setItem("utilisateur", JSON.stringify(json));
        localStorage.setItem("role", json.role);

        // Mettre à jour le contexte d'authentification
        dispatch({
          type: "LOGIN",
          payload: { utilisateur: json, role: json.role },
        });

        setIsLoading(false);
        return json; // Retourne les données utilisateur
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setIsLoading(false);
      setError("Une erreur est survenue");
    }
  };

  return { login, isLoading, error };
};
