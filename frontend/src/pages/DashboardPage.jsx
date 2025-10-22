import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PromptGenius</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.name} ({user?.tier || 'Free'})
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-muted-foreground">
            Start optimizing your AI prompts with PromptGenius
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/prompts')}>
            <CardHeader>
              <CardTitle>My Prompts</CardTitle>
              <CardDescription>Manage and optimize your prompts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Total prompts</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/templates')}>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Browse professional templates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm text-muted-foreground">Available templates</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/brand-voices')}>
            <CardHeader>
              <CardTitle>Brand Voices</CardTitle>
              <CardDescription>Define your brand's tone</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Brand voices</p>
            </CardContent>
          </Card>
        </div>

        {!user?.tier || user?.tier === 'free' ? (
          <Card className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription className="text-blue-100">
                Unlock unlimited prompts, advanced features, and team collaboration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" onClick={() => navigate('/pricing')}>
                View Pricing
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

