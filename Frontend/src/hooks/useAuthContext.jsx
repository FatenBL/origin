import { useContext } from "react";
import { AuthContext } from "../context/authContext"; // Assurez-vous du bon chemin

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // Si le contexte n'est pas disponible, cela signifie que le provider n'est pas utilisé correctement
  if (!context) {
    throw new Error(
      "useAuthContext doit être utilisé à l'intérieur d'un AuthContextProvider"
    );
  }

  return context;
};
