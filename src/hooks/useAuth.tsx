
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/lib/supabase-types';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For development, let's create a mock session
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      username: 'TestUser',
      xp: 0,
      level: 1,
      streak_days: 0,
      last_login: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    // Simulate auth state from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);

    return () => {
      // Cleanup
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // For development, just check if email and password are not empty
      if (email && password) {
        const mockUser: User = {
          id: '1',
          email,
          username: email.split('@')[0],
          xp: 0,
          level: 1,
          streak_days: 0,
          last_login: new Date().toISOString(),
          created_at: new Date().toISOString(),
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success('Welcome back!');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // For development, just create a new user
      const mockUser: User = {
        id: '1',
        email,
        username,
        xp: 0,
        level: 1,
        streak_days: 0,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
