import ProgressSummary from '../components/ProgressSummary';
import DraftTypeSelector from '../components/DraftTypeSelector';
import WeeklyChallengeCard from '../components/challenge/WeeklyChallengeCard';

export default function DraftPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Draft Practice</h1>
        <p className="text-muted-foreground">
          Master legal drafting through hands-on practice
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProgressSummary />
        </div>
        <div>
          <WeeklyChallengeCard />
        </div>
      </div>

      <DraftTypeSelector />
    </div>
  );
}
