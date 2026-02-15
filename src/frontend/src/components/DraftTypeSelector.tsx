import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { DRAFT_TYPES } from '../data/draftTypes';
import { useOfflineState } from '../storage/useOfflineState';
import { calculateDraftStatus } from '../utils/mastery';
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';

export default function DraftTypeSelector() {
  const navigate = useNavigate();
  const { draftPortfolio } = useOfflineState();

  const phase1Types = DRAFT_TYPES.filter(dt => dt.phase === 1);
  const phase2Types = DRAFT_TYPES.filter(dt => dt.phase === 2);

  const renderDraftType = (draftType: typeof DRAFT_TYPES[0]) => {
    const status = calculateDraftStatus(draftType.id, draftPortfolio);
    const attempts = draftPortfolio.filter(a => a.draftType === draftType.id);
    const avgScore = attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
      : 0;

    return (
      <Card key={draftType.id} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{draftType.name}</CardTitle>
              <CardDescription className="mt-1">{draftType.description}</CardDescription>
            </div>
            <div className="ml-4">
              {status === 'mastered' && (
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  MASTERED
                </Badge>
              )}
              {status === 'in-progress' && (
                <Badge variant="secondary">
                  <PlayCircle className="h-3 w-3 mr-1" />
                  IN PROGRESS
                </Badge>
              )}
              {status === 'not-started' && (
                <Badge variant="outline">
                  <Circle className="h-3 w-3 mr-1" />
                  NOT STARTED
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {attempts.length > 0 ? (
                <span>{attempts.length} drafts • Avg: {avgScore}/10</span>
              ) : (
                <span>No drafts yet</span>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => navigate({ to: `/draft/${draftType.id}/structure` })}
            >
              Start Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Phase 1: Pre-College Priority</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {phase1Types.map(renderDraftType)}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Phase 2: Advanced (During College)</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {phase2Types.map(renderDraftType)}
        </div>
      </div>
    </div>
  );
}
