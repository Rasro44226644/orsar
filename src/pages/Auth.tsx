
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Button } from '@/components/ui/button';
import { Globe, Languages } from 'lucide-react';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-zinc-900 dark:to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white/80 backdrop-blur-sm dark:bg-zinc-800/80">
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-2">
            <Globe className="h-8 w-8 text-purple-500 animate-pulse" />
            <Languages className="h-8 w-8 text-pink-500 animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {isSignIn ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {isSignIn 
              ? 'Sign in to continue your learning journey' 
              : 'Join us and start learning Hausa today'}
          </p>
        </div>

        {isSignIn ? <SignInForm /> : <SignUpForm />}

        <div className="text-center space-y-2">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            {isSignIn ? 'Create Account' : 'Sign In'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
