import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const CLAUSES = [
  {
    id: 'termination',
    title: 'Termination Clause',
    category: 'Agreements',
    text: 'Either party may terminate this agreement by giving 30 days written notice to the other party.',
  },
  {
    id: 'jurisdiction',
    title: 'Jurisdiction Clause',
    category: 'Agreements',
    text: 'The courts at [City] shall have exclusive jurisdiction over any disputes arising from this agreement.',
  },
  {
    id: 'force-majeure',
    title: 'Force Majeure',
    category: 'Agreements',
    text: 'Neither party shall be liable for failure to perform due to circumstances beyond reasonable control, including but not limited to acts of God, war, strikes, or government restrictions.',
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality Clause',
    category: 'Agreements',
    text: 'Both parties agree to maintain confidentiality of all information exchanged during the term of this agreement and for a period of [X] years thereafter.',
  },
  {
    id: 'indemnity',
    title: 'Indemnity Clause',
    category: 'Agreements',
    text: 'The [Party] shall indemnify and hold harmless the [Other Party] from any claims, damages, or losses arising from [specific circumstances].',
  },
];

export default function ClauseLibraryPage() {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredClauses = CLAUSES.filter(clause =>
    clause.title.toLowerCase().includes(search.toLowerCase()) ||
    clause.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (clause: typeof CLAUSES[0]) => {
    navigator.clipboard.writeText(clause.text);
    setCopiedId(clause.id);
    toast.success('Clause copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clause Library</h1>
        <p className="text-muted-foreground">
          Standard clauses you can use in your drafts
        </p>
      </div>

      <Input
        placeholder="Search clauses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4">
        {filteredClauses.map((clause) => (
          <Card key={clause.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{clause.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">{clause.category}</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(clause)}
                >
                  {copiedId === clause.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm bg-muted p-3 rounded-lg">{clause.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
