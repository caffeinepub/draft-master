import { DraftType, Difficulty } from '../storage/types';

export interface Scenario {
  id: string;
  draftType: DraftType;
  title: string;
  difficulty: Difficulty;
  description: string;
  modelDraft: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'ln-breach-1',
    draftType: 'legal-notice',
    title: 'Breach of Contract - Supply Failure',
    difficulty: 'basic',
    description: `Your client ABC Ltd entered into a contract with XYZ Suppliers on 01/01/2026 to supply 1000 units of raw material by 31/01/2026. XYZ delivered only 500 units. ABC suffered loss of ₹5 lakh due to production stoppage. Draft a legal notice.`,
    modelDraft: `[Model draft would be shown after submission]`,
  },
  {
    id: 'ln-recovery-1',
    draftType: 'legal-notice',
    title: 'Money Recovery - Loan Default',
    difficulty: 'basic',
    description: `Your client Mr. Sharma lent ₹10 lakhs to Mr. Verma on 15/06/2025 with 12% annual interest, repayable by 15/12/2025. Despite repeated requests, Mr. Verma has not repaid. Draft a legal notice for recovery.`,
    modelDraft: `[Model draft would be shown after submission]`,
  },
  {
    id: 'ln-landlord-1',
    draftType: 'legal-notice',
    title: 'Landlord-Tenant Dispute',
    difficulty: 'intermediate',
    description: `Your client owns a commercial property rented to a tenant since 01/01/2024 at ₹50,000/month. The tenant has not paid rent for the last 6 months and refuses to vacate. Draft a legal notice.`,
    modelDraft: `[Model draft would be shown after submission]`,
  },
  {
    id: 'ln-cheque-1',
    draftType: 'legal-notice',
    title: 'Cheque Dishonor Case',
    difficulty: 'intermediate',
    description: `Your client received a cheque for ₹2 lakhs from the accused for goods supplied. The cheque was dishonored due to insufficient funds. Draft a legal notice under Section 138 of the Negotiable Instruments Act.`,
    modelDraft: `[Model draft would be shown after submission]`,
  },
  {
    id: 'ln-defamation-1',
    draftType: 'legal-notice',
    title: 'Defamation on Social Media',
    difficulty: 'advanced',
    description: `Your client, a reputed doctor, was defamed by false allegations posted on social media by a former patient. The posts have damaged the client's reputation and practice. Draft a legal notice for defamation.`,
    modelDraft: `[Model draft would be shown after submission]`,
  },
];

export function getScenariosByType(draftType: DraftType): Scenario[] {
  return SCENARIOS.filter(s => s.draftType === draftType);
}

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find(s => s.id === id);
}
