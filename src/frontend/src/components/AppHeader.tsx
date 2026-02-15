import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, FolderOpen, TrendingUp, Settings } from 'lucide-react';
import { useOfflineState } from '../storage/useOfflineState';

export default function AppHeader() {
  const navigate = useNavigate();
  const { userLevel, userXP } = useOfflineState();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/assets/generated/draft-master-logo.dim_512x512.png" 
              alt="DRAFT MASTER" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">DRAFT MASTER</h1>
              <p className="text-xs text-muted-foreground">
                Level {userLevel} • {userXP} XP
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate({ to: '/draft' })}
            >
              <FileText className="h-4 w-4 mr-2" />
              Draft
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate({ to: '/learn' })}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate({ to: '/portfolio' })}
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Portfolio
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate({ to: '/skills' })}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Skills
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate({ to: '/settings' })}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
