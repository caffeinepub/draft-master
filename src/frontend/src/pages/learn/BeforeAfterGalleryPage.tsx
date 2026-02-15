import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EXAMPLES = [
  {
    title: 'Legal Notice - Demand Clause',
    before: 'I request you to please pay the money.',
    after: 'My client demands payment of Rs. 5,00,000/- (Rupees Five Lakhs only) within 15 days from the receipt of this notice.',
    improvements: [
      'Changed weak "I request" to strong "My client demands"',
      'Added specific amount',
      'Included clear deadline',
    ],
  },
  {
    title: 'Legal Notice - Legal Basis',
    before: 'You broke the contract and should pay.',
    after: 'Your actions constitute a breach of contract under Section 73 of the Indian Contract Act, 1872, and my client is entitled to compensation for the losses suffered.',
    improvements: [
      'Added specific legal provision',
      'Professional language',
      'Clear entitlement statement',
    ],
  },
];

export default function BeforeAfterGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Before/After Gallery</h1>
        <p className="text-muted-foreground">
          See how drafts improve with feedback
        </p>
      </div>

      <div className="space-y-6">
        {EXAMPLES.map((example, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{example.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Badge variant="destructive" className="mb-2">Before</Badge>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    {example.before}
                  </div>
                </div>
                <div>
                  <Badge variant="default" className="mb-2 bg-green-600">After</Badge>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    {example.after}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Improvements:</p>
                <ul className="list-disc list-inside space-y-1">
                  {example.improvements.map((improvement, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{improvement}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
