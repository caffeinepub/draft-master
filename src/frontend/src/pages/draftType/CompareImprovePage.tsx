import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOfflineState } from '../../storage/useOfflineState';
import { getScenarioById } from '../../data/scenariosBank';
import { AlertCircle, CheckCircle2, Lightbulb, Edit, FileText } from 'lucide-react';

export default function CompareImprovePage() {
  const { draftType } = useParams({ from: '/draft/$draftType/compare' });
  const navigate = useNavigate();
  const { draftPortfolio } = useOfflineState();

  const latestAttempt = [...draftPortfolio]
    .filter(a => a.draftType === draftType && a.score > 0)
    .sort((a, b) => b.date - a.date)[0];

  if (!latestAttempt) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            No submissions yet. Complete a draft to see feedback.
          </p>
        </CardContent>
      </Card>
    );
  }

  const scenario = getScenarioById(latestAttempt.scenarioId);
  const issues = latestAttempt.feedback.filter(f => f.type === 'issue');
  const suggestions = latestAttempt.feedback.filter(f => f.type === 'suggestion');
  const positives = latestAttempt.feedback.filter(f => f.type === 'positive');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Score</CardTitle>
            <div className="text-4xl font-bold">{latestAttempt.score}/10</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Structural</p>
              <p className="text-lg font-bold">{latestAttempt.subScores.structural}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Legal</p>
              <p className="text-lg font-bold">{latestAttempt.subScores.legal}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Factual</p>
              <p className="text-lg font-bold">{latestAttempt.subScores.factual}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Language</p>
              <p className="text-lg font-bold">{latestAttempt.subScores.language}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Complete</p>
              <p className="text-lg font-bold">{latestAttempt.subScores.completeness}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
              {latestAttempt.content}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Model Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
              {scenario?.modelDraft || 'Model draft available after submission'}
            </div>
          </CardContent>
        </Card>
      </div>

      {issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Issues Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {issues.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Badge variant="destructive" className="shrink-0">!</Badge>
                <p className="text-sm">{item.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestions.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Badge variant="secondary" className="shrink-0">💡</Badge>
                <p className="text-sm">{item.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {positives.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              Good Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {positives.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Badge variant="default" className="shrink-0 bg-green-600">✓</Badge>
                <p className="text-sm">{item.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button onClick={() => navigate({ to: `/editor/${latestAttempt.id}` })}>
          <Edit className="h-4 w-4 mr-2" />
          Refine Draft
        </Button>
        <Button variant="outline" onClick={() => navigate({ to: `/draft/${draftType}/practice` })}>
          <FileText className="h-4 w-4 mr-2" />
          Try New Scenario
        </Button>
      </div>
    </div>
  );
}
