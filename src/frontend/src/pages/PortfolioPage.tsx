import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOfflineState } from '../storage/useOfflineState';
import { getDraftTypeInfo } from '../data/draftTypes';
import { useNavigate } from '@tanstack/react-router';
import { FileText, Download } from 'lucide-react';
import { exportAllDrafts } from '../utils/exporters';

export default function PortfolioPage() {
  const { draftPortfolio } = useOfflineState();
  const navigate = useNavigate();

  const groupedDrafts = draftPortfolio.reduce((acc, draft) => {
    if (!acc[draft.draftType]) {
      acc[draft.draftType] = [];
    }
    acc[draft.draftType].push(draft);
    return acc;
  }, {} as Record<string, typeof draftPortfolio>);

  const handleExportAll = () => {
    exportAllDrafts(draftPortfolio);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Draft Portfolio</h1>
          <p className="text-muted-foreground">
            {draftPortfolio.length} drafts • Average: {
              draftPortfolio.length > 0
                ? (draftPortfolio.reduce((sum, d) => sum + d.score, 0) / draftPortfolio.length).toFixed(1)
                : '0.0'
            }/10
          </p>
        </div>
        <Button onClick={handleExportAll} disabled={draftPortfolio.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      {draftPortfolio.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No drafts yet. Start practicing!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedDrafts).map(([draftType, drafts]) => {
            const typeInfo = getDraftTypeInfo(draftType as any);
            const avgScore = (drafts.reduce((sum, d) => sum + d.score, 0) / drafts.length).toFixed(1);

            return (
              <Card key={draftType}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{typeInfo?.name || draftType}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {drafts.length} drafts • Avg: {avgScore}/10
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {drafts.map((draft) => (
                      <div
                        key={draft.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => navigate({ to: `/editor/${draft.id}` })}
                      >
                        <div>
                          <p className="font-medium">
                            {draft.isWizardGenerated ? 'Wizard Draft' : 'Free Practice'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(draft.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{draft.score}/10</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
