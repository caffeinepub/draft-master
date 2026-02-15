import { StorageState, Achievement, DraftAttempt, MasteryEvent, SkillScores, DraftType } from './types';

const STORAGE_KEY = 'draft-master-state';
const STORAGE_VERSION = 1;

const DEFAULT_STATE: StorageState = {
  userXP: 0,
  userLevel: 1,
  achievements: [
    { id: 'first-draft', name: 'First Draft', description: 'Complete your first guided draft', earned: false },
    { id: 'perfectionist', name: 'Perfectionist', description: 'Score 10/10 on any draft', earned: false },
    { id: 'variety', name: 'Variety', description: 'Try all 8 draft types', earned: false },
    { id: 'portfolio-builder', name: 'Portfolio Builder', description: 'Complete 20 drafts', earned: false },
    { id: 'refinement-master', name: 'Refinement Master', description: 'Improve 5 drafts to 9/10+', earned: false },
    { id: 'pre-college-ready', name: 'Pre-College Ready', description: 'Master Phase 1 drafts (6 types)', earned: false },
    { id: 'challenge-champion', name: 'Challenge Champion', description: 'Complete 4 weekly challenges', earned: false },
  ],
  draftPortfolio: [],
  skillScores: {
    structural: 0,
    legal: 0,
    factual: 0,
    language: 0,
    completeness: 0,
  },
  masteryEvents: [],
  weeklyChallenge: {
    weekId: getCurrentWeekId(),
    completed: false,
  },
  settings: {
    voiceToTextEnabled: true,
    onlineBackupEnabled: false,
    nexusSyncEnabled: false,
  },
  version: STORAGE_VERSION,
};

function getCurrentWeekId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const week = Math.ceil((now.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `${year}-W${week}`;
}

export function initializeStorage(): void {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
  } else {
    try {
      const state = JSON.parse(stored) as StorageState;
      if (state.version !== STORAGE_VERSION) {
        migrateStorage(state);
      }
      
      const currentWeek = getCurrentWeekId();
      if (state.weeklyChallenge.weekId !== currentWeek) {
        state.weeklyChallenge = {
          weekId: currentWeek,
          completed: false,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (error) {
      console.error('Failed to parse storage, resetting:', error);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
    }
  }
}

function migrateStorage(state: StorageState): void {
  const migrated = { ...DEFAULT_STATE, ...state, version: STORAGE_VERSION };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
}

export function getState(): StorageState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return DEFAULT_STATE;
  }
  try {
    return JSON.parse(stored) as StorageState;
  } catch {
    return DEFAULT_STATE;
  }
}

export function setState(state: Partial<StorageState>): void {
  const current = getState();
  const updated = { ...current, ...state };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function addDraftAttempt(attempt: DraftAttempt): void {
  const state = getState();
  state.draftPortfolio.push(attempt);
  
  updateSkillScores(state, attempt.subScores);
  updateXP(state, attempt);
  checkAchievements(state);
  checkMastery(state, attempt.draftType);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function updateDraftAttempt(attemptId: string, updates: Partial<DraftAttempt>): void {
  const state = getState();
  const index = state.draftPortfolio.findIndex(a => a.id === attemptId);
  if (index !== -1) {
    state.draftPortfolio[index] = { ...state.draftPortfolio[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function getDraftAttempt(attemptId: string): DraftAttempt | null {
  const state = getState();
  return state.draftPortfolio.find(a => a.id === attemptId) || null;
}

function updateSkillScores(state: StorageState, subScores: SkillScores): void {
  const recentAttempts = state.draftPortfolio.slice(-10);
  const allScores = [...recentAttempts.map(a => a.subScores), subScores];
  
  state.skillScores = {
    structural: Math.round(allScores.reduce((sum, s) => sum + s.structural, 0) / allScores.length),
    legal: Math.round(allScores.reduce((sum, s) => sum + s.legal, 0) / allScores.length),
    factual: Math.round(allScores.reduce((sum, s) => sum + s.factual, 0) / allScores.length),
    language: Math.round(allScores.reduce((sum, s) => sum + s.language, 0) / allScores.length),
    completeness: Math.round(allScores.reduce((sum, s) => sum + s.completeness, 0) / allScores.length),
  };
}

function updateXP(state: StorageState, attempt: DraftAttempt): void {
  let xpGain = attempt.isWizardGenerated ? 30 : 50;
  
  if (attempt.score >= 9) {
    xpGain += 30;
  }
  
  state.userXP += xpGain;
  state.userLevel = calculateLevel(state.userXP);
}

function calculateLevel(xp: number): number {
  const thresholds = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200, 7600, 9200];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) {
      return i + 1;
    }
  }
  return 1;
}

function checkAchievements(state: StorageState): void {
  const achievements = state.achievements;
  
  if (!achievements.find(a => a.id === 'first-draft')?.earned && state.draftPortfolio.length >= 1) {
    const achievement = achievements.find(a => a.id === 'first-draft');
    if (achievement) {
      achievement.earned = true;
      achievement.earnedDate = Date.now();
    }
  }
  
  if (!achievements.find(a => a.id === 'perfectionist')?.earned && state.draftPortfolio.some(a => a.score === 10)) {
    const achievement = achievements.find(a => a.id === 'perfectionist');
    if (achievement) {
      achievement.earned = true;
      achievement.earnedDate = Date.now();
    }
  }
  
  const uniqueTypes = new Set(state.draftPortfolio.map(a => a.draftType));
  if (!achievements.find(a => a.id === 'variety')?.earned && uniqueTypes.size >= 8) {
    const achievement = achievements.find(a => a.id === 'variety');
    if (achievement) {
      achievement.earned = true;
      achievement.earnedDate = Date.now();
    }
  }
  
  if (!achievements.find(a => a.id === 'portfolio-builder')?.earned && state.draftPortfolio.length >= 20) {
    const achievement = achievements.find(a => a.id === 'portfolio-builder');
    if (achievement) {
      achievement.earned = true;
      achievement.earnedDate = Date.now();
    }
  }
}

function checkMastery(state: StorageState, draftType: DraftType): void {
  const typeAttempts = state.draftPortfolio.filter(a => a.draftType === draftType && a.score >= 8);
  
  if (typeAttempts.length >= 3) {
    const existingEvent = state.masteryEvents.find(e => e.draftType === draftType);
    if (!existingEvent) {
      state.masteryEvents.push({
        draftType: draftType,
        date: Date.now(),
        evidence: `Scored 8+ on ${typeAttempts.length} drafts`,
      });
      
      if (state.settings.nexusSyncEnabled && state.settings.nexusEndpoint) {
        syncToNexus(state.settings.nexusEndpoint, {
          draftType: draftType,
          date: Date.now(),
          evidence: `Scored 8+ on ${typeAttempts.length} drafts`,
        });
      }
    }
  }
}

async function syncToNexus(endpoint: string, event: MasteryEvent): Promise<void> {
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch (error) {
    console.error('Failed to sync to NEXUS:', error);
  }
}

export function resetStorage(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
}

export function exportData(): string {
  return localStorage.getItem(STORAGE_KEY) || JSON.stringify(DEFAULT_STATE);
}

export function importData(data: string): boolean {
  try {
    const parsed = JSON.parse(data) as StorageState;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return true;
  } catch {
    return false;
  }
}

export function getAllStorageKeys(): string[] {
  return [STORAGE_KEY];
}
