import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import "../../AppGererEmploye.css";

function GererEmploye() {
  const { utilisateur, role } = useAuthContext();
  const [employes, setEmployes] = useState([]); // État pour stocker les employés
  const [message, setMessage] = useState(""); // État pour le message de notification

  // Fonction pour récupérer les employés depuis le backend
  const fetchEmployes = async () => {
    try {
      const response = await fetch("http://localhost:3000/Employe/employes"); // Remplace avec ton URL backend
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des employés");
      }
      const data = await response.json();
      setEmployes(data); // Stocker les employés dans le state
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer un employé
  const supprimer = async (idE) => {
    try {
      const response = await fetch(
        `http://localhost:3000/Employe/supprimer/${idE}`,
        {
          method: "DELETE", // Utilisation de la méthode DELETE pour supprimer
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'employé");
      }

      // Si la suppression réussie, mettre à jour la liste des employés
      setEmployes(employes.filter((employe) => employe.idE !== idE));
      setMessage("Employé supprimé avec succès"); // Message de succès
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de la suppression de l'employé"); // Message d'erreur
    }
  };

  // Charger les employés au montage du composant
  useEffect(() => {
    fetchEmployes();
  }, []);

  return (
    <div className="gerer-employe-container">
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 w-100">
        <h1 className="text-center display-4 my-3">Liste des employés</h1>

        {/* Afficher le message de notification */}
        {message && (
          <div className="alert alert-info w-75 text-center mb-3">
            {message}
          </div>
        )}

        <div className="w-75 rounded bg-white border shadow p-4">
          {/* Bouton bien positionné en haut à droite */}
          <div className="d-flex justify-content-end mb-3">
            <Link to="/AjouterEmploye">
              <button className="btn btn-success">Ajouter Employé</button>
            </Link>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employes.length > 0 ? (
                employes.map((employe) => (
                  <tr key={employe.idE}>
                    <td>{employe.nom}</td>
                    <td>{employe.prenom}</td>
                    <td>{employe.email}</td>
                    <td>
                      <Link to={`/ModifierEmploye/${employe.idE}`}>
                        <button className="btn btn-sm btn-primary m-2">
                          Modifier
                        </button>
                      </Link>

                      <button
                        className="btn btn-sm btn-danger m-2"
                        onClick={() => supprimer(employe.idE)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Aucun employé trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GererEmploye;
