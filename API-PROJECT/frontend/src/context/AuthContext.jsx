import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.data.message || "Login failed" };
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid credentials";
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/register", { username, email, password });
      if (response.data.success) {
        return { success: true };
      }
      return { success: false, message: response.data.message || "Registration failed" };
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed";
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
