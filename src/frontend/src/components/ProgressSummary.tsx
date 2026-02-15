import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useOfflineState } from '../storage/useOfflineState';
import { DRAFT_TYPES } from '../data/draftTypes';
import { calculateDraftStatus } from '../utils/mastery';

export default function ProgressSummary() {
  const { draftPortfolio, userLevel, userXP } = useOfflineState();

  const phase1Types = DRAFT_TYPES.filter(dt => dt.phase === 1);
  const phase2Types = DRAFT_TYPES.filter(dt => dt.phase === 2);

  const phase1Mastered = phase1Types.filter(dt => 
    calculateDraftStatus(dt.id, draftPortfolio) === 'mastered'
  ).length;

  const phase2Mastered = phase2Types.filter(dt => 
    calculateDraftStatus(dt.id, draftPortfolio) === 'mastered'
  ).length;

  const totalDrafts = draftPortfolio.length;
  const avgScore = totalDrafts > 0
    ? (draftPortfolio.reduce((sum, a) => sum + a.score, 0) / totalDrafts).toFixed(1)
    : '0.0';

  const levelTitles = [
    'Drafting Novice', 'Drafting Novice', 'Drafting Novice',
    'Competent Drafter', 'Competent Drafter', 'Competent Drafter',
    'Skilled Practitioner', 'Skilled Practitioner', 'Skilled Practitioner',
    'Drafting Expert', 'Drafting Expert', 'Drafting Expert',
    'Master Draftsman', 'Master Draftsman', 'Master Draftsman',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {userLevel}: {levelTitles[userLevel - 1]}</span>
            <span className="text-sm text-muted-foreground">{userXP} XP</span>
          </div>
          <Progress value={(userXP % 500) / 5} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Phase 1 Mastered</p>
            <p className="text-2xl font-bold">{phase1Mastered}/{phase1Types.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phase 2 Mastered</p>
            <p className="text-2xl font-bold">{phase2Mastered}/{phase2Types.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Drafts</p>
            <p className="text-2xl font-bold">{totalDrafts}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Score</p>
            <p className="text-2xl font-bold">{avgScore}/10</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
