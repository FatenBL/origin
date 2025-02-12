import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        utilisateur: action.payload.utilisateur,
        role: action.payload.role,
      };
    case "LOGOUT":
      return { utilisateur: null, role: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    utilisateur: null,
    role: null,
  });

  useEffect(() => {
    const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
    const role = localStorage.getItem("role");
    if (utilisateur && role) {
      dispatch({
        type: "LOGIN",
        payload: { utilisateur: utilisateur, role: role },
      });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    //* qui rend disponible à tous les composants enfants children*//
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
