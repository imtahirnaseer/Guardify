import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getCurrentUser, setCurrentUser, saveUser, getUsers } from '../utils/storage';
import { hashPassword, generateId } from '../utils/crypto';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = getUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return false;
      }
      
      const passwordHash = hashPassword(password);
      if (user.passwordHash !== passwordHash) {
        return false;
      }
      
      setUser(user);
      setCurrentUser(user);
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = getUsers();
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        return false;
      }
      
      const newUser: User = {
        id: generateId(),
        email,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
        isVerified: true, // For demo purposes
      };
      
      saveUser(newUser);
      setUser(newUser);
      setCurrentUser(newUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};