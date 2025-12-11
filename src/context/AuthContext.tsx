import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = storage.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simple mock authentication - in production, this would call an API
    // For demo purposes, accept any email/password
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('coach') ? 'coach' : 'client',
    };
    
    setUser(mockUser);
    storage.setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.clearUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

