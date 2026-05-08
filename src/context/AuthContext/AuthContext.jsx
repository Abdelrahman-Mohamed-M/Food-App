import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  let [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    const encodedToken = localStorage.getItem("token");

    if (encodedToken) {
      const decodedToken = jwtDecode(encodedToken);
      setLoginData(decodedToken);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
