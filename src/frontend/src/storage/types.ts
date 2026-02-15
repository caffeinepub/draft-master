export type DraftType = 
  | 'legal-notice'
  | 'loan-agreement'
  | 'rent-agreement'
  | 'service-agreement'
  | 'police-complaint'
  | 'bail-application'
  | 'plaint'
  | 'writ-petition';

export type DraftStatus = 'not-started' | 'in-progress' | 'mastered';

export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface FeedbackItem {
  type: 'issue' | 'suggestion' | 'positive';
  message: string;
  section?: string;
}

export interface DraftAttempt {
  id: string;
  draftType: DraftType;
  scenarioId: string;
  content: string;
  score: number;
  subScores: {
    structural: number;
    legal: number;
    factual: number;
    language: number;
    completeness: number;
  };
  feedback: FeedbackItem[];
  date: number;
  isWizardGenerated: boolean;
  timedMode?: {
    enabled: boolean;
    duration: number;
    timeSpent: number;
  };
}

export interface SkillScores {
  structural: number;
  legal: number;
  factual: number;
  language: number;
  completeness: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: number;
}

export interface MasteryEvent {
  draftType: DraftType;
  date: number;
  evidence: string;
}

export interface WeeklyChallengeStatus {
  weekId: string;
  completed: boolean;
  completedDate?: number;
  attemptId?: string;
}

export interface AppSettings {
  voiceToTextEnabled: boolean;
  onlineBackupEnabled: boolean;
  nexusEndpoint?: string;
  nexusSyncEnabled: boolean;
}

export interface StorageState {
  userXP: number;
  userLevel: number;
  achievements: Achievement[];
  draftPortfolio: DraftAttempt[];
  skillScores: SkillScores;
  masteryEvents: MasteryEvent[];
  weeklyChallenge: WeeklyChallengeStatus;
  settings: AppSettings;
  version: number;
}
