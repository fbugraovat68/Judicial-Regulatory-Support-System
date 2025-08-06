import type { LookupItem } from "@/shared/types/lookup";

interface UserData {
    id: number;
    email: string;
    name: string;
    nameAr: string;
}

interface File {
    file: File;
    name: string;
    description?: string;
    tags?: string[];
}

interface CaseDocument {
    files: File[];
    deleteFileIds?: number[];
}

interface CaseLevel extends LookupItem { }
interface InternalClient extends LookupItem { }
interface CaseType extends LookupItem { }
interface LawsuitType extends LookupItem { }
interface SpecializedCourt extends LookupItem { }
interface District extends LookupItem { }
interface City extends LookupItem { }
interface Litigant extends UserData { }
interface AdditionalConsultant extends UserData { }
interface Tag { id: number; value: string; }

interface CaseInformation {
    decisionNumber: number;
    decisionDate: string;
    noticeNumber: number;
    noticeDate: string;
    inquiryNumber: number;
    inquiryDate: string;
    repaymentAmount: number;
    repaymentDate: string;
    grievanceRequestNumber: number;
    grievanceRequestDate: string;
    fineAmount: number;
    lossRatio: number;
    isConfidential: boolean;
    consultantOpinion: string;
    priority: string;
}

export interface CaseRequest {
    name: string;
    description: string;
    isAgainstStc: boolean;
    caseFilingDate: string;
    caseLevel: CaseLevel;
    internalClient: InternalClient;
    caseType: CaseType;
    lawsuitType: LawsuitType;
    specializedCourt: SpecializedCourt;
    district: District;
    city: City;
    litigants: Litigant[];
    additionalConsultants: AdditionalConsultant[];
    tags: Tag[];
    caseInformation: CaseInformation;
    documents: CaseDocument;
}