import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getScenariosByType } from '../../data/scenariosBank';
import { useOfflineState } from '../../storage/useOfflineState';
import { DraftAttempt } from '../../storage/types';

export default function FreePracticePage() {
  const { draftType } = useParams({ from: '/draft/$draftType/practice' });
  const navigate = useNavigate();
  const { saveDraftAttempt } = useOfflineState();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = getScenariosByType(draftType as any);

  const handleStartDrafting = (scenarioId: string) => {
    const attempt: DraftAttempt = {
      id: `draft-${Date.now()}`,
      draftType: draftType as any,
      scenarioId,
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Free Practice Mode</CardTitle>
          <CardDescription>
            Choose a scenario and draft from scratch
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                  <CardDescription className="mt-2 whitespace-pre-wrap">
                    {scenario.description}
                  </CardDescription>
                </div>
                <Badge variant={
                  scenario.difficulty === 'basic' ? 'default' :
                  scenario.difficulty === 'intermediate' ? 'secondary' :
                  'outline'
                }>
                  {scenario.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleStartDrafting(scenario.id)}>
                Start Drafting
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
