import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import "../AppNavbar.css";
const NavResponsable = () => {
  const { utilisateur, role } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <ul className="right">
      <li>
        <button className="nav-button">
          <Link to="/GererEmploye" className="link-button">
            Gerer Employe
          </Link>
        </button>
      </li>
      <li>
        <button className="nav-button3">
          <Link to="/GererProjet" className="link-button">
            Gerer Projet
          </Link>
        </button>
      </li>
      <li>
        <button className="nav-button2" onClick={handleLogout}>
          Deconnexion
        </button>
      </li>
    </ul>
  );
};
export default NavResponsable;
