import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { toast } from "sonner";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../lib/userService";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user for demo purposes
// This is kept static as requested
const ADMIN_EMAIL = "admin@dairyfarm.com";
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage for user data on component mount
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // Special case for admin login (static)
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser: User = {
          id: "admin1",
          firstName: "Admin",
          lastName: "User",
          email: ADMIN_EMAIL,
          role: "admin",
        };
        setUser(adminUser);
        localStorage.setItem("admin-user", JSON.stringify(adminUser));
        toast.success("Admin login successful");
        setIsLoading(false);
        return;
      }

      // Regular user login with Firestore
      const userData = await loginUser(email, password);
      setUser(userData);
      toast.success("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);

    try {
      const userData = await registerUser(firstName, lastName, email, password);
      setUser(userData);
      toast.success("Registration successful");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Check if user is admin (stored in localStorage)
      if (user?.role === "admin") {
        localStorage.removeItem("admin-user");
      } else {
        // Regular logout
        await logoutUser();
      }
      setUser(null);
      toast.info("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
