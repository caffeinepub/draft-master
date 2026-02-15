import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle } from 'lucide-react';

const COMMON_MISTAKES = {
  'legal-notice': [
    {
      mistake: 'Vague demand',
      why: 'Unclear demands make enforcement difficult',
      fix: 'Be specific: "pay ₹5 lakh" instead of "pay compensation"',
      example: '❌ "Pay appropriate compensation"\n✅ "Pay Rs. 5,00,000/- (Rupees Five Lakhs only)"',
    },
    {
      mistake: 'Missing deadline',
      why: 'No timeframe for compliance',
      fix: 'Always include "within 15 days from receipt of this notice"',
      example: '❌ "Please comply soon"\n✅ "within 15 days from the receipt of this notice"',
    },
    {
      mistake: 'No consequences mentioned',
      why: 'Recipient may not take notice seriously',
      fix: 'State "failing which, legal action will be initiated"',
      example: '❌ Ending without consequences\n✅ "Failing which, my client shall initiate appropriate legal proceedings"',
    },
    {
      mistake: 'Emotional language',
      why: 'Unprofessional and legally weak',
      fix: 'Use formal, objective language',
      example: '❌ "You cheated us!"\n✅ "You have committed a breach of contract"',
    },
    {
      mistake: 'Wrong addressee details',
      why: 'Notice may be invalid if not properly addressed',
      fix: 'Verify complete name and address',
      example: '❌ "To whom it may concern"\n✅ "To, Mr. Rajesh Kumar, 123 Business Street..."',
    },
  ],
};

export default function CommonMistakesPage() {
  const { draftType } = useParams({ from: '/learn/mistakes/$draftType' });
  const mistakes = COMMON_MISTAKES[draftType as keyof typeof COMMON_MISTAKES] || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Common Mistakes</h1>
        <p className="text-muted-foreground">
          Learn from typical errors students make
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Top Mistakes in {draftType.replace('-', ' ')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {mistakes.map((item, index) => (
              <AccordionItem key={index} value={`mistake-${index}`}>
                <AccordionTrigger>
                  <span className="font-medium">{index + 1}. {item.mistake}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Why it's wrong:</p>
                    <p className="text-sm">{item.why}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">How to fix:</p>
                    <p className="text-sm">{item.fix}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Example:</p>
                    <pre className="text-sm bg-muted p-3 rounded-lg whitespace-pre-wrap">
                      {item.example}
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
