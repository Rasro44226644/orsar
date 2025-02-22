
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Home, Book, Trophy, User, LogOut } from 'lucide-react';
import { useAuthContext } from './AuthProvider';
import { toast } from 'sonner';

export const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuthContext();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border p-4 md:top-0 md:bottom-auto">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={isActive('/') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Home</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/lessons') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/lessons">
              <Book className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Lessons</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/achievements') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/achievements">
              <Trophy className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Achievements</span>
            </Link>
          </Button>
        </div>

        <div className="flex gap-2">
          {user ? (
            <>
              <Button
                variant={isActive('/profile') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/profile">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">Profile</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Sign Out</span>
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              asChild
            >
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
