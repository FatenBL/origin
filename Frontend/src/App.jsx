import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthResponsableEmploye from "./AuthResponsableEmploye";
import AcceuilResponsable from "./Components/Responsable/AcceuilResponsable";
import AcceuilEmploye from "./Components/Employe/AcceuilEmploye";
import GererEmploye from "./Components/Responsable/GererEmploye";
import AjouterEmploye from "./Components/Responsable/AjouterEmploye";
import ModifierEmploye from "./Components/Responsable/ModifierEmploye";
import GererProjet from "./Components/Responsable/GererProjet";
import Navbar from "./Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { utilisateur, role } = useAuthContext();

  return (
    <BrowserRouter>
      <div>
        {window.location.pathname !== "/" && <Navbar />}

        <Routes>
          <Route path="/" element={<AuthResponsableEmploye />} />
          <Route path="/AcceuilResponsable" element={<AcceuilResponsable />} />
          <Route path="/AcceuilEmploye" element={<AcceuilEmploye />} />
          <Route path="/GererEmploye" element={<GererEmploye />} />
          <Route path="/AjouterEmploye" element={<AjouterEmploye />} />
          <Route path="/ModifierEmploye/:idE" element={<ModifierEmploye />} />
          <Route path="/ModifierEmploye" element={<ModifierEmploye />} />
          <Route path="/GererProjet" element={<GererProjet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
