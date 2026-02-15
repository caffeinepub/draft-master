import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { BookOpen, AlertCircle, CheckSquare, FileText, Library, Image } from 'lucide-react';

export default function LearnPage() {
  const navigate = useNavigate();

  const resources = [
    {
      icon: AlertCircle,
      title: 'Common Mistakes',
      description: 'Learn from typical errors students make',
      path: '/learn/mistakes/legal-notice',
    },
    {
      icon: CheckSquare,
      title: 'Checklists',
      description: 'Essential elements for each draft type',
      path: '/learn/checklist/legal-notice',
    },
    {
      icon: FileText,
      title: 'Templates',
      description: 'Professional blank templates',
      path: '/learn/templates',
    },
    {
      icon: Library,
      title: 'Clause Library',
      description: 'Standard clauses you can use',
      path: '/learn/clauses',
    },
    {
      icon: Image,
      title: 'Before/After Gallery',
      description: 'See improvements in action',
      path: '/learn/gallery',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
        <p className="text-muted-foreground">
          Study materials to improve your drafting skills
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.path} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <resource.icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate({ to: resource.path })}
              >
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
