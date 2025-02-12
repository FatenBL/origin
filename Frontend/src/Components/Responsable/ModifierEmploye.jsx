import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ModifierEmploye() {
  const { idE } = useParams(); // Récupérer l'ID de l'employé depuis l'URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    poste: "",
    id_personne: "", // Ajouter id_personne dans les données du formulaire
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!idE) {
      setError("ID employé invalide");
      setLoading(false);
      return;
    }

    // Récupérer directement les informations de l'employé et de la personne dans la même route
    fetch(`http://localhost:3000/Employe/affichierInfoEmploye/${idE}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          nom: data.nom || "",
          prenom: data.prenom || "",
          email: data.email || "",
          telephone: data.telephone || "",
          poste: data.poste || "",
          id_personne: data.id_personne || "", // Ajouter l'id_personne dans l'état
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [idE]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/Employe/mise_A_Jour/${idE}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // Envoyer toutes les données, y compris id_personne
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'employé.");
      }

      alert("Employé mis à jour avec succès");
      navigate("/GererEmploye");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Modifier Informations d'employé</h2>
      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Nom:</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom:</label>
          <input
            type="text"
            className="form-control"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone:</label>
          <input
            type="text"
            className="form-control"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Poste:</label>
          <input
            type="text"
            className="form-control"
            name="poste"
            value={formData.poste}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Enregistrer
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/GererEmploye")}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModifierEmploye;
