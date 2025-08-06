// Base interface for lookup items
interface BaseItem {
  id: number;
  nameEn: string;
  nameAr: string;
}

// Main lookup item interface
export interface LookupItem extends BaseItem {
  code: string;
  cities?: BaseItem[];
}
export interface Consultant {
  id: number;
  name: string;
  nameAr?: string;
  email?: string;
}
export interface Litigant {
  id: number;
  name: string;
  nameAr?: string;
  email?: string;
}

// Lookup types const
export const LookupTypes = {
  JudgmentTypes: "JUDGMENT_TYPES",
  JudgmentResult: "JUDGMENT_RESULT",
  CaseLevel: "CASE_LEVEL",
  InternalClient: "INTERNAL_CLIENT",
  CaseType: "CASE_TYPE",
  City: "CITY",
  District: "DISTRICT",
  CaseCategory: "CASE_CATEGORY",
  Courts: "COURTS",
  States: "STATES"
} as const;

export type LookupTypes = typeof LookupTypes[keyof typeof LookupTypes];

// State interface for the context
export interface LookupState {
  lookups: Partial<Record<LookupTypes, LookupItem[]>>;
  loading: Partial<Record<LookupTypes, boolean>>;
  cities: Record<string, LookupItem[]>;
  error: Partial<Record<LookupTypes, string | null>>;
}

// Action types for reducer
export type LookupAction =
  | { type: 'SET_LOADING'; payload: { type: LookupTypes; loading: boolean } }
  | { type: 'SET_LOOKUPS'; payload: { type: LookupTypes; data: LookupItem[] } }
  | { type: 'SET_CITIES'; payload: { districtId: string; cities: LookupItem[] } }
  | { type: 'SET_ERROR'; payload: { type: LookupTypes; error: string | null } }
  | { type: 'CLEAR_ERROR'; payload: { type: LookupTypes } }; 