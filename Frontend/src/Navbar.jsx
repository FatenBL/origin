import RLinks from "./NavLayout/NavResponsable";
import { useAuthContext } from "./hooks/useAuthContext"; // Correction du chemin
import image from "./assets/majesteye1.jpg";
import "./AppNavbar.css";
const Navbar = () => {
  const { utilisateur, role } = useAuthContext();
  const navbarStyle = {
    backgroundColor: "#fff", // Utiliser camelCase pour les propriétés CSS
    width: "210vh", // Utiliser des guillemets pour les valeurs avec des unités
    height: "80px", // Idem pour les valeurs avec unités
    position: "fixed",
    top: "15px",
    left: "40px",
    zIndex: 1000, // En camelCase
    borderRadius: "12px", // En camelCase
    boxShadow: "0 0 5px 4px #dbcfcf", // Idem
  };

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="logo">
        <img src={image} className="imgLogo"></img>
      </div>
      {utilisateur ? role === "responsable" ? <RLinks /> : null : null}
    </nav>
  );
};

export default Navbar;
