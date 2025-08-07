// Case Status - Updated to match API
export const CaseStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  HAVE_FINAL_JUDGMENT: 'HAVE_FINAL_JUDGMENT',
  CLOSED: 'CLOSED',
  SEND_BACK: 'SEND_BACK',
  HAVE_INITIAL_JUDGMENT: 'HAVE_INITIAL_JUDGMENT',
  UNDER_REVIEW: 'UNDER_REVIEW'
} as const;

export type CaseStatus = typeof CaseStatus[keyof typeof CaseStatus];

// Case Priority - Updated to match API
export const CasePriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
} as const;

export type CasePriority = typeof CasePriority[keyof typeof CasePriority];

// Lookup Item Interface (for nested objects)
export interface LookupItem {
  id: number;
  nameEn: string;
  nameAr: string;
  code: string | null;
  orderNumber: number;
}

// Litigant Interface
export interface Litigant {
  id: number;
  name: string;
  nameAr: string;
  email: string;
}

// Case Information Interface
export interface CaseInformation {
  id: number;
  decisionNumber: number | null;
  decisionDate: string | null;
  noticeNumber: number | null;
  noticeDate: string | null;
  inquiryNumber: number | null;
  inquiryDate: string | null;
  caseNumber: string;
  closingDate: string | null;
  repaymentAmount: string | null;
  repaymentDate: string | null;
  grievanceRequestNumber: number | null;
  grievanceRequestDate: string | null;
  fineAmount: number;
  lossRatio: number;
  isConfidential: boolean;
  consultantOpinion: string;
  priority: CasePriority;
  againstName: string;
  applierName: string;
  approvalDate: string | null;
  value: number | null;
  createdDate: string;
  georgianDate: string | null;
}

// Case Details Interface - Updated to match API
export interface CaseDetails {
  id: number;
  name: string;
  description: string;
  isAgainstStc: boolean;
  caseFilingDate: string;
  state: CaseStatus;
  assignedConsultantName: string;
  additionalConsultantIds: number[];
  createdDate: string;
  createdBy: string;
  caseFolderId: number | null;
  internalClient: LookupItem;
  caseType: LookupItem;
  lawsuitType: LookupItem;
  specializedCourt: LookupItem;
  district: LookupItem;
  city: LookupItem;
  caseLevel: LookupItem;
  litigants: Litigant[];
  caseInformation: CaseInformation;
  tags: string[];
}

// Cases Filter Criteria Interface
export interface CasesFilterCriteria {
  size: number;
  page: number;
  searchKey?: string | null;
  sort?: string | null;
  fromPeriod?: string | null;
  toPeriod?: string | null;
  finalResultId?: string | null;
  lawsuitTypeId?: string | null;
  courtId?: string | null;
  state?: string | null;
}

// Case Note Interface
export interface CaseNote {
  id: number;
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
}

// Case Document Interface
export interface CaseDocument {
  id: number;
  name: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedByEmail: string;
  uploadedAt: string;
  description?: string;
  isPublic: boolean;
  downloadUrl?: string;
}

// Case Team Member Interface
export interface CaseTeamMember {
  id: number;
  userId: number;
  name: string;
  email: string;
  role: string;
  addedBy: string;
  addedAt: string;
  isActive: boolean;
}

// Case Judgement Interface
export interface CaseJudgement {
  id: number;
  title: string;
  content: string;
  courtName: string;
  judgeName: string;
  judgementDate: string;
  outcome: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
}

// Case Event Interface
export interface CaseEvent {
  id: number;
  title: string;
  description?: string;
  eventType: 'HEARING' | 'MEETING' | 'DEADLINE' | 'FILING' | 'OTHER';
  startDate: string;
  endDate?: string;
  location?: string;
  attendees?: string[];
  createdBy: string;
  createdAt: string;
  isCompleted: boolean;
}


// Case Statistics Interface
export interface CaseStatistics {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  pendingCases: number;
  overdueCases: number;
  casesByStatus: Record<CaseStatus, number>;
  casesByPriority: Record<CasePriority, number>;
  casesByType: Record<string, number>;
}


export interface DownloadableFile {
  content: Base64URLString;
  itemName: string;
  mimType: string;
  originalFileName: string;
  size: number;
}
