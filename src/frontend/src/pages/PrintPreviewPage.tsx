import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOfflineState } from '../storage/useOfflineState';
import { getDraftTypeInfo } from '../data/draftTypes';
import { Printer, ArrowLeft } from 'lucide-react';

export default function PrintPreviewPage() {
  const { attemptId } = useParams({ from: '/print/$attemptId' });
  const navigate = useNavigate();
  const { getAttempt } = useOfflineState();

  const attempt = getAttempt(attemptId);

  if (!attempt) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Draft not found</p>
        </CardContent>
      </Card>
    );
  }

  const typeInfo = getDraftTypeInfo(attempt.draftType);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: '/portfolio' })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>

      <div className="bg-white p-12 shadow-lg print:shadow-none print:p-0">
        <div className="max-w-[8.5in] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">{typeInfo?.name || 'Legal Draft'}</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Score: {attempt.score}/10 | Date: {new Date(attempt.date).toLocaleDateString()}
            </p>
          </div>

          <div className="font-serif text-base leading-relaxed whitespace-pre-wrap">
            {attempt.content}
          </div>
        </div>
      </div>
    </div>
  );
}
