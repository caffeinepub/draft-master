import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { useOfflineState } from '../../storage/useOfflineState';
import { DraftAttempt } from '../../storage/types';
import { Trophy } from 'lucide-react';

export default function WeeklyChallengePage() {
  const navigate = useNavigate();
  const { saveDraftAttempt, weeklyChallenge } = useOfflineState();

  const handleStartChallenge = () => {
    const attempt: DraftAttempt = {
      id: `challenge-${Date.now()}`,
      draftType: 'legal-notice',
      scenarioId: 'weekly-challenge',
      content: '',
      score: 0,
      subScores: {
        structural: 0,
        legal: 0,
        factual: 0,
        language: 0,
        completeness: 0,
      },
      feedback: [],
      date: Date.now(),
      isWizardGenerated: false,
    };

    saveDraftAttempt(attempt);
    navigate({ to: `/editor/${attempt.id}` });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <Trophy className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">Weekly Challenge</h1>
        <p className="text-muted-foreground">
          Test your skills with a complex scenario
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Multi-Party Contract Dispute</CardTitle>
            <Badge>Advanced</Badge>
          </div>
          <CardDescription>
            Draft a legal notice for a complex three-party breach of contract
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm whitespace-pre-wrap">
              Your client, ABC Manufacturing Ltd., entered into a tripartite agreement with XYZ Suppliers and DEF Logistics on March 1, 2026. Under the agreement:
              
              - XYZ was to supply 5000 units of components by April 15, 2026
              - DEF was to transport the components to ABC's factory
              - ABC was to pay XYZ ₹25 lakhs upon delivery
              
              XYZ delivered only 2000 units on April 20 (5 days late). DEF transported these units but damaged 500 during transit. ABC has suffered production losses of ₹15 lakhs.
              
              Draft a comprehensive legal notice addressing both XYZ and DEF, citing appropriate legal provisions and demanding specific remedies.
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Reward</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 200 XP upon completion</li>
              <li>• Special Challenge Champion badge</li>
              <li>• Detailed expert feedback</li>
            </ul>
          </div>

          {weeklyChallenge.completed ? (
            <div className="text-center py-4">
              <Badge variant="default" className="bg-green-600">
                Challenge Completed!
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Come back next week for a new challenge
              </p>
            </div>
          ) : (
            <Button onClick={handleStartChallenge} className="w-full" size="lg">
              <Trophy className="h-4 w-4 mr-2" />
              Start Challenge
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
