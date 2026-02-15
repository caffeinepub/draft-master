import { DraftType, FeedbackItem } from '../storage/types';

interface FeedbackResult {
  score: number;
  subScores: {
    structural: number;
    legal: number;
    factual: number;
    language: number;
    completeness: number;
  };
  items: FeedbackItem[];
}

export function analyzeDraft(content: string, draftType: DraftType, modelDraft: string): FeedbackResult {
  const items: FeedbackItem[] = [];
  let structural = 8;
  let legal = 7;
  let factual = 8;
  let language = 7;
  let completeness = 8;

  const lowerContent = content.toLowerCase();

  if (draftType === 'legal-notice') {
    if (!lowerContent.includes('within') && !lowerContent.includes('days')) {
      items.push({
        type: 'issue',
        message: 'Missing deadline clause',
        section: 'deadline',
      });
      completeness -= 2;
    }

    if (lowerContent.includes('i request') || lowerContent.includes('please')) {
      items.push({
        type: 'issue',
        message: 'Weak demand language - use "My client demands" instead of "I request"',
        section: 'demand',
      });
      language -= 2;
    }

    if (!lowerContent.includes('section') && !lowerContent.includes('act')) {
      items.push({
        type: 'issue',
        message: 'No legal basis cited - mention relevant sections/acts',
        section: 'breach',
      });
      legal -= 2;
    }

    if (!lowerContent.includes('to,') && !lowerContent.includes('subject:')) {
      items.push({
        type: 'issue',
        message: 'Missing proper header format',
        section: 'header',
      });
      structural -= 2;
    }

    if (lowerContent.includes('chronological') || lowerContent.includes('date')) {
      items.push({
        type: 'positive',
        message: 'Good factual presentation with dates',
      });
    }

    if (lowerContent.includes('yours faithfully') || lowerContent.includes('advocate')) {
      items.push({
        type: 'positive',
        message: 'Professional closing format',
      });
    }
  }

  if (content.length < 200) {
    items.push({
      type: 'issue',
      message: 'Draft appears too short - ensure all essential elements are included',
    });
    completeness -= 2;
  }

  if (content.length > 2000) {
    items.push({
      type: 'suggestion',
      message: 'Consider making the draft more concise',
    });
  }

  const score = Math.round((structural + legal + factual + language + completeness) / 5);

  return {
    score: Math.max(0, Math.min(10, score)),
    subScores: {
      structural: Math.max(0, Math.min(10, structural)),
      legal: Math.max(0, Math.min(10, legal)),
      factual: Math.max(0, Math.min(10, factual)),
      language: Math.max(0, Math.min(10, language)),
      completeness: Math.max(0, Math.min(10, completeness)),
    },
    items,
  };
}
