import { useState, useEffect } from "react";
import api from "../api/axios";
import { getToken, setToken as saveToken, removeToken } from "../utils/tokenStorage";
import { AuthContext } from "./authContextObject";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      saveToken(token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      removeToken();
    }
  }, [token]);

  const login = (newToken, userData = null) => {
    setToken(newToken);
    if (userData) setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}