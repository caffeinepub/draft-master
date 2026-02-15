import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useOfflineState } from '../../storage/useOfflineState';
import { toast } from 'sonner';
import { Save, Send, ArrowLeft } from 'lucide-react';
import { analyzeDraft } from '../../feedback/feedbackEngine';
import { getScenarioById } from '../../data/scenariosBank';

export default function EditorPage() {
  const { attemptId } = useParams({ from: '/editor/$attemptId' });
  const navigate = useNavigate();
  const { getAttempt, updateAttempt } = useOfflineState();
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const attempt = getAttempt(attemptId);

  useEffect(() => {
    if (attempt) {
      setContent(attempt.content);
    }
  }, [attempt]);

  const handleSave = useCallback(() => {
    if (!attempt) return;
    setIsSaving(true);
    updateAttempt(attemptId, { content });
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Draft saved');
    }, 300);
  }, [attempt, attemptId, content, updateAttempt]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (content !== attempt?.content) {
        handleSave();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [content, attempt, handleSave]);

  const handleSubmit = () => {
    if (!attempt) return;

    const scenario = getScenarioById(attempt.scenarioId);
    const feedback = analyzeDraft(content, attempt.draftType, scenario?.modelDraft || '');

    updateAttempt(attemptId, {
      content,
      score: feedback.score,
      subScores: feedback.subScores,
      feedback: feedback.items,
    });

    toast.success('Draft submitted for review');
    navigate({ to: `/draft/${attempt.draftType}/compare` });
  };

  if (!attempt) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Draft not found</p>
        </CardContent>
      </Card>
    );
  }

  const scenario = getScenarioById(attempt.scenarioId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: `/draft/${attempt.draftType}/practice` })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button onClick={handleSubmit}>
            <Send className="h-4 w-4 mr-2" />
            Submit for Review
          </Button>
        </div>
      </div>

      {scenario && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scenario</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{scenario.description}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Draft Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start drafting here..."
            className="min-h-[500px] font-serif text-base"
          />
        </CardContent>
      </Card>
    </div>
  );
}
