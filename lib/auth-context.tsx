"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "cashier";
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: { email: string; password: string; user: User }[] = [
  {
    email: "admin@pawsome.com",
    password: "admin123",
    user: {
      id: "1",
      name: "Admin",
      email: "admin@pawsome.com",
      role: "admin",
    },
  },
  {
    email: "staff@pawsome.com",
    password: "staff123",
    user: {
      id: "2",
      name: "Staff",
      email: "staff@pawsome.com",
      role: "staff",
    },
  },
];

const STORAGE_KEY = "pawsome-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const login = (email: string, password: string) => {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found.user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
