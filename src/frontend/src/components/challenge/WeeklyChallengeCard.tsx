import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { useOfflineState } from '../../storage/useOfflineState';
import { Trophy, CheckCircle2 } from 'lucide-react';

export default function WeeklyChallengeCard() {
  const navigate = useNavigate();
  const { weeklyChallenge } = useOfflineState();

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <img 
            src="/assets/generated/badge-set-8.dim_256x256.png" 
            alt="Challenge Badge" 
            className="h-8 w-8"
          />
          <CardTitle className="text-lg">Weekly Challenge</CardTitle>
        </div>
        <CardDescription>
          Multi-party contract dispute
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant="secondary">Advanced</Badge>
          <p className="text-sm mt-2 text-muted-foreground">
            Draft a legal notice for a complex three-party breach of contract scenario
          </p>
        </div>

        {weeklyChallenge.completed ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Completed!</span>
          </div>
        ) : (
          <Button 
            className="w-full"
            onClick={() => navigate({ to: '/challenge' })}
          >
            <Trophy className="h-4 w-4 mr-2" />
            Accept Challenge
          </Button>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Reward: 200 XP + Special Badge
        </p>
      </CardContent>
    </Card>
  );
}
