
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/lib/supabase-types';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Convert Supabase user to our User type
        const userData: User = {
          id: session.user.id,
          email: session.user.email!,
          username: session.user.user_metadata.username || '',
          xp: session.user.user_metadata.xp || 0,
          level: session.user.user_metadata.level || 1,
          streak_days: session.user.user_metadata.streak_days || 0,
          last_login: session.user.last_sign_in_at || new Date().toISOString(),
          created_at: session.user.created_at,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email!,
          username: session.user.user_metadata.username || '',
          xp: session.user.user_metadata.xp || 0,
          level: session.user.user_metadata.level || 1,
          streak_days: session.user.user_metadata.streak_days || 0,
          last_login: session.user.last_sign_in_at || new Date().toISOString(),
          created_at: session.user.created_at,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            xp: 0,
            level: 1,
            streak_days: 0,
          },
        },
      });
      if (error) throw error;
      toast.success('Welcome! Please check your email to verify your account.');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
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
