export const legalNoticeAnatomy = {
  title: 'Legal Notice - Anatomy',
  sections: [
    {
      id: 'header',
      name: 'HEADER',
      description: 'Notice sender details, receiver details, and date',
      essential: true,
    },
    {
      id: 'subject',
      name: 'SUBJECT LINE',
      description: 'Clear, specific purpose of the notice',
      essential: true,
    },
    {
      id: 'salutation',
      name: 'SALUTATION',
      description: '"Sir/Madam" or specific name',
      essential: true,
    },
    {
      id: 'facts',
      name: 'FACTS (Para 1-2)',
      description: 'Chronological events - what happened, when, where',
      essential: true,
    },
    {
      id: 'breach',
      name: 'LEGAL BREACH (Para 3)',
      description: 'Which law/agreement violated, specific sections/clauses',
      essential: true,
    },
    {
      id: 'demand',
      name: 'DEMAND (Para 4)',
      description: 'What you want - be specific (amount, action)',
      essential: true,
    },
    {
      id: 'deadline',
      name: 'DEADLINE (Para 5)',
      description: '"Within 15 days of receipt" - reasonable timeframe',
      essential: true,
    },
    {
      id: 'consequences',
      name: 'CONSEQUENCES (Para 6)',
      description: '"Failing which, legal action" - don\'t specify exact action',
      essential: true,
    },
    {
      id: 'closing',
      name: 'CLOSING',
      description: '"Yours faithfully", signature, name, designation',
      essential: true,
    },
  ],
  modelNotice: `To,
Mr. Rajesh Kumar
123 Business Street
New Delhi - 110001

Date: February 15, 2026

Subject: Legal Notice for Breach of Contract dated January 1, 2026

Sir,

Under instructions from and on behalf of my client, M/s ABC Ltd., having its registered office at 456 Corporate Avenue, New Delhi - 110002, I hereby serve you with this legal notice.

That my client entered into a contract with you on January 1, 2026, whereby you agreed to supply 1000 units of raw material by January 31, 2026. A copy of the said contract is enclosed herewith for your ready reference.

That despite the clear terms of the contract, you have delivered only 500 units, thereby committing a material breach of the contract. This breach has caused my client to suffer a loss of Rs. 5,00,000/- (Rupees Five Lakhs only) due to production stoppage and consequential damages.

That your actions constitute a breach of contract under Section 73 of the Indian Contract Act, 1872, and my client is entitled to compensation for the losses suffered.

That my client demands that you immediately deliver the remaining 500 units of raw material and pay compensation of Rs. 5,00,000/- (Rupees Five Lakhs only) for the losses incurred.

That you are hereby called upon to comply with the above demands within 15 days from the receipt of this notice.

That failing compliance within the stipulated period, my client shall be constrained to initiate appropriate legal proceedings against you for recovery of the said amount along with interest and costs, without any further reference to you.

Yours faithfully,

[Advocate Name]
Advocate for ABC Ltd.`,
  annotations: [
    { section: 'header', highlight: 'To,\nMr. Rajesh Kumar\n123 Business Street\nNew Delhi - 110001\n\nDate: February 15, 2026', note: 'Complete addressee details and date' },
    { section: 'subject', highlight: 'Subject: Legal Notice for Breach of Contract dated January 1, 2026', note: 'Clear and specific subject line' },
    { section: 'facts', highlight: 'That my client entered into a contract with you on January 1, 2026', note: 'Chronological facts with dates' },
    { section: 'breach', highlight: 'That your actions constitute a breach of contract under Section 73', note: 'Legal basis cited' },
    { section: 'demand', highlight: 'pay compensation of Rs. 5,00,000/-', note: 'Specific monetary demand' },
    { section: 'deadline', highlight: 'within 15 days from the receipt of this notice', note: 'Clear deadline' },
    { section: 'consequences', highlight: 'my client shall be constrained to initiate appropriate legal proceedings', note: 'Consequences without specifics' },
  ],
};

export const legalNoticeWizardQuestions = [
  {
    id: 'type',
    question: 'What type of notice?',
    type: 'select' as const,
    options: [
      { value: 'recovery', label: 'Recovery of money' },
      { value: 'breach', label: 'Breach of contract' },
      { value: 'landlord', label: 'Landlord-tenant dispute' },
      { value: 'defamation', label: 'Defamation' },
      { value: 'consumer', label: 'Consumer complaint' },
    ],
  },
  {
    id: 'clientName',
    question: "Your client's name:",
    type: 'text' as const,
    placeholder: 'ABC Ltd.',
  },
  {
    id: 'clientAddress',
    question: "Your client's address:",
    type: 'textarea' as const,
    placeholder: '456 Corporate Avenue, New Delhi - 110002',
  },
  {
    id: 'opponentName',
    question: "Opponent's name:",
    type: 'text' as const,
    placeholder: 'Mr. Rajesh Kumar',
  },
  {
    id: 'opponentAddress',
    question: "Opponent's address:",
    type: 'textarea' as const,
    placeholder: '123 Business Street, New Delhi - 110001',
  },
  {
    id: 'contractDescription',
    question: 'What was the contract? (2-3 lines)',
    type: 'textarea' as const,
    placeholder: 'Supply of 1000 units of raw material by January 31, 2026',
  },
  {
    id: 'breach',
    question: 'What was breached?',
    type: 'textarea' as const,
    placeholder: 'Delivered only 500 units instead of 1000',
  },
  {
    id: 'breachDate',
    question: 'When did the breach occur?',
    type: 'date' as const,
  },
  {
    id: 'demand',
    question: 'What do you demand?',
    type: 'textarea' as const,
    placeholder: 'Deliver remaining units and pay compensation',
  },
  {
    id: 'amount',
    question: 'Amount (if monetary):',
    type: 'text' as const,
    placeholder: '500000',
  },
];
