import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useOfflineState } from '../storage/useOfflineState';
import { getOverallProficiency } from '../utils/mastery';

export default function SkillsPage() {
  const { skillScores, draftPortfolio } = useOfflineState();

  const skills = [
    { key: 'structural', label: 'Structural Clarity', description: 'Proper sections, logical flow, format adherence' },
    { key: 'legal', label: 'Legal Precision', description: 'Correct sections cited, accurate terminology' },
    { key: 'factual', label: 'Factual Accuracy', description: 'All facts included, chronological order' },
    { key: 'language', label: 'Language Quality', description: 'Professional tone, clear sentences' },
    { key: 'completeness', label: 'Completeness', description: 'No missing clauses, all elements present' },
  ];

  const proficiency = getOverallProficiency(skillScores);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Skills Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress across core drafting skills
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Drafting Proficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{proficiency}%</span>
              <span className="text-sm text-muted-foreground">
                {proficiency >= 80 ? 'Excellent' : proficiency >= 60 ? 'Good' : proficiency >= 40 ? 'Fair' : 'Needs Improvement'}
              </span>
            </div>
            <Progress value={proficiency} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {skills.map((skill) => {
          const score = skillScores[skill.key as keyof typeof skillScores];
          return (
            <Card key={skill.key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{skill.label}</CardTitle>
                  <span className="text-2xl font-bold">{score}/10</span>
                </div>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </CardHeader>
              <CardContent>
                <Progress value={score * 10} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {draftPortfolio.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {draftPortfolio.slice(-5).reverse().map((draft) => (
                <div key={draft.id} className="flex items-center justify-between p-2 border-b last:border-0">
                  <span className="text-sm">{new Date(draft.date).toLocaleDateString()}</span>
                  <span className="font-medium">{draft.score}/10</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
