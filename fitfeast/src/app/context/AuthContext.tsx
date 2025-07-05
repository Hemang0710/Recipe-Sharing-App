'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      console.log('AuthContext: Fetching user data');
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const userData = await res.json();
        console.log('AuthContext: User data fetched successfully', userData);
        setUser(userData);
      } else {
        console.log('AuthContext: No user data found');
        setUser(null);
      }
    } catch (err) {
      console.error('AuthContext: Failed to fetch user', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signIn = async (userData: User) => {
    console.log('AuthContext: Signing in user', userData);
    try {
      // Verify the user data with the server
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        throw new Error('Failed to verify user session');
      }
      
      setUser(userData);
      console.log('AuthContext: User signed in successfully');
    } catch (error) {
      console.error('AuthContext: Sign in error', error);
      setUser(null);
      throw error;
    }
  };

  const signOut = async () => {
    console.log('AuthContext: Signing out user');
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      setUser(null);
      console.log('AuthContext: User signed out successfully');
      router.push('/');
    } catch (err) {
      console.error('AuthContext: Signout error', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
