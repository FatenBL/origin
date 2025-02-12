import React from "react";

function AcceuilResponsable() {
  return (
    <>
      <div
        style={{
          width: "550px",
          position: "relative",
          top: "150px",
        }}
      >
        <h1
          style={{
            color: " #1b7bc9", // Couleur sombre pour le titre
            fontSize: "36px", // Taille plus grande pour le titre
            fontWeight: "bold", // Gras pour le titre
            marginBottom: "24px", // Espacement en bas du titre
          }}
        >
          Bienvenue dans votre espace, Responsable !
        </h1>
        <p
          style={{
            color: "#34495E", // Couleur plus claire pour le texte
            fontSize: "18px", // Taille de texte confortable
            lineHeight: "1.6", // Espacement entre les lignes pour une meilleure lisibilité

            fontFamily: "'Roboto', sans-serif", // Police moderne
          }}
        >
          Explorez les outils à votre disposition et commencez à optimiser la
          gestion de vos employés dès maintenant. L'avenir de votre équipe
          commence ici !
        </p>
      </div>
      <div
        style={{
          backgroundImage: `url("/AcceuilR.jpeg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Ajuste la taille de l'image
          backgroundPosition: "center bottom", // Centre l'image horizontalement et la place en bas verticalement
          height: "400px", // Ajuste la hauteur de la section
          width: "480px", // Utilise 100% de la largeur disponible
          marginLeft: "700px",
          marginTop: "-80px",
        }}
      ></div>
    </>
  );
}

export default AcceuilResponsable;
