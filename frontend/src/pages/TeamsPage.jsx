import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { Button } from '@/components/ui/button';

export default function TeamsPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>
            PromptGenius
          </h1>
          <Button variant="outline" onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </Button>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">TeamsPage</h2>
        <p className="text-muted-foreground">Feature coming soon...</p>
      </div>
    </div>
  );
}
