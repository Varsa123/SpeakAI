import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Failed to load user:", err);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const login = (userData, token) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
    } catch (err) {
      console.error("Login storage failed:", err);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);