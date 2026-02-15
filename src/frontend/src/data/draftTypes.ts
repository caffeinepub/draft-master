import { DraftType } from '../storage/types';

export interface DraftTypeInfo {
  id: DraftType;
  name: string;
  phase: 1 | 2;
  description: string;
}

export const DRAFT_TYPES: DraftTypeInfo[] = [
  {
    id: 'legal-notice',
    name: 'Legal Notice',
    phase: 1,
    description: 'Formal written communication demanding action or redress',
  },
  {
    id: 'loan-agreement',
    name: 'Loan Agreement',
    phase: 1,
    description: 'Contract between lender and borrower for loan terms',
  },
  {
    id: 'rent-agreement',
    name: 'Rent Agreement',
    phase: 1,
    description: 'Lease contract between landlord and tenant',
  },
  {
    id: 'service-agreement',
    name: 'Service Agreement',
    phase: 1,
    description: 'Contract for provision of services',
  },
  {
    id: 'police-complaint',
    name: 'Police Complaint/FIR',
    phase: 1,
    description: 'First Information Report for criminal matters',
  },
  {
    id: 'bail-application',
    name: 'Bail Application',
    phase: 1,
    description: 'Application for release on bail',
  },
  {
    id: 'plaint',
    name: 'Plaint (Civil Suit)',
    phase: 2,
    description: 'Written statement of cause of action in civil court',
  },
  {
    id: 'writ-petition',
    name: 'Writ Petition',
    phase: 2,
    description: 'Petition to High Court or Supreme Court for constitutional remedies',
  },
];

export function getDraftTypeInfo(id: DraftType): DraftTypeInfo | undefined {
  return DRAFT_TYPES.find(dt => dt.id === id);
}
