import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { legalNoticeWizardQuestions } from '../../data/legalNotice';
import { useOfflineState } from '../../storage/useOfflineState';
import { DraftAttempt } from '../../storage/types';

export default function GuidedWizardPage() {
  const { draftType } = useParams({ from: '/draft/$draftType/wizard' });
  const navigate = useNavigate();
  const { saveDraftAttempt } = useOfflineState();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (draftType !== 'legal-notice') {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            Wizard for {draftType} coming soon
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleGenerate = () => {
    const generatedContent = `To,
${answers.opponentName || '[Opponent Name]'}
${answers.opponentAddress || '[Opponent Address]'}

Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}

Subject: Legal Notice for ${answers.type === 'breach' ? 'Breach of Contract' : 'Recovery of Money'}

Sir/Madam,

Under instructions from and on behalf of my client, ${answers.clientName || '[Client Name]'}, having its registered office at ${answers.clientAddress || '[Client Address]'}, I hereby serve you with this legal notice.

That my client entered into a contract with you regarding ${answers.contractDescription || '[contract details]'}.

That ${answers.breach || '[breach details]'}. This breach has caused my client to suffer losses.

That your actions constitute a breach of contract under Section 73 of the Indian Contract Act, 1872.

That my client demands ${answers.demand || '[demand details]'}${answers.amount ? ` and payment of Rs. ${answers.amount}/-` : ''}.

That you are hereby called upon to comply with the above demands within 15 days from the receipt of this notice.

That failing compliance within the stipulated period, my client shall be constrained to initiate appropriate legal proceedings against you, without any further reference to you.

Yours faithfully,

[Advocate Name]
Advocate for ${answers.clientName || '[Client Name]'}`;

    const attempt: DraftAttempt = {
      id: `draft-${Date.now()}`,
      draftType: draftType as any,
      scenarioId: 'wizard-generated',
      content: generatedContent,
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
      isWizardGenerated: true,
    };

    saveDraftAttempt(attempt);
    navigate({ to: `/editor/${attempt.id}` });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Notice Wizard</CardTitle>
        <p className="text-sm text-muted-foreground">
          Answer questions to build your notice
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {legalNoticeWizardQuestions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label>{question.question}</Label>
            {question.type === 'select' && (
              <Select
                value={answers[question.id] || ''}
                onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {question.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {question.type === 'text' && (
              <Input
                placeholder={question.placeholder}
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              />
            )}
            {question.type === 'textarea' && (
              <Textarea
                placeholder={question.placeholder}
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                rows={3}
              />
            )}
            {question.type === 'date' && (
              <Input
                type="date"
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              />
            )}
          </div>
        ))}

        <Button onClick={handleGenerate} className="w-full" size="lg">
          Generate Notice
        </Button>
      </CardContent>
    </Card>
  );
}
