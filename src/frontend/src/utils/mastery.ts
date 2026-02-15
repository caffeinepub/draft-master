import { DraftType, DraftStatus, DraftAttempt, SkillScores } from '../storage/types';

export function calculateDraftStatus(draftType: DraftType, attempts: DraftAttempt[]): DraftStatus {
  const typeAttempts = attempts.filter(a => a.draftType === draftType);
  
  if (typeAttempts.length === 0) {
    return 'not-started';
  }
  
  const masteryAttempts = typeAttempts.filter(a => a.score >= 8);
  
  if (masteryAttempts.length >= 3) {
    return 'mastered';
  }
  
  return 'in-progress';
}

export function getOverallProficiency(skillScores: SkillScores): number {
  const scores = [
    skillScores.structural,
    skillScores.legal,
    skillScores.factual,
    skillScores.language,
    skillScores.completeness,
  ];
  const sum = scores.reduce((a, b) => a + b, 0);
  return Math.round((sum / scores.length) * 10);
}
