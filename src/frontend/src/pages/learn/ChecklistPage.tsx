import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare } from 'lucide-react';

const CHECKLISTS = {
  'legal-notice': [
    'Complete addressee details (name and full address)',
    'Date of the notice',
    'Clear and specific subject line',
    'Proper salutation',
    'Chronological facts with dates',
    'Legal basis cited (relevant sections/acts)',
    'Specific demand (amount or action)',
    'Reasonable deadline (typically 15 days)',
    'Consequences for non-compliance',
    'Professional closing with signature',
  ],
};

export default function ChecklistPage() {
  const { draftType } = useParams({ from: '/learn/checklist/$draftType' });
  const checklist = CHECKLISTS[draftType as keyof typeof CHECKLISTS] || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Drafting Checklist</h1>
        <p className="text-muted-foreground">
          Essential elements to include
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            {draftType.replace('-', ' ')} Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Checkbox id={`check-${index}`} />
                <label
                  htmlFor={`check-${index}`}
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
