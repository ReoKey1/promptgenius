import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { Button } from '@/components/ui/button';

export default function PromptsPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>
            Prompt-U
          </h1>
          <Button variant="outline" onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </Button>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">My Prompts</h2>
        <p className="text-muted-foreground">Prompt management coming soon...</p>
      </div>
    </div>
  );
}

