
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user for demo purposes
const ADMIN_EMAIL = 'admin@dairyfarm.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for user data on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simple mock authentication
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser: User = {
          id: 'admin1',
          firstName: 'Admin',
          lastName: 'User',
          email: ADMIN_EMAIL,
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        toast.success("Admin login successful");
        return;
      }
      
      // Mock regular user login (in a real app, this would validate against a backend)
      if (email && password.length >= 6) {
        const newUser: User = {
          id: `user-${Date.now()}`,
          firstName: email.split('@')[0],
          lastName: '',
          email,
          role: 'user'
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success("Login successful");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would send data to your backend
      const newUser: User = {
        id: `user-${Date.now()}`,
        firstName,
        lastName,
        email,
        role: 'user'
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Registration successful");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info("Logged out successfully");
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
