import { createContext, useState } from "react";
import jwt_decode from "jwt-decode"; // Assurez-vous d'importer jwt-decode

const defaultValue = {
  token: "",
  userId: null,
  login: () => {},
};

const AuthContext = createContext(defaultValue);

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const loginHandler = (token) => {
    setToken(token);

    // Décodez le token pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt_decode(token);
    const user = decodedToken.userId;
      // Stockez l'userId dans le localStorage
  localStorage.setItem('userId', user);
    console.log(user);
    setUserId(user);
  };

  const contextValue = {
    token: token,
    userId: userId,
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
