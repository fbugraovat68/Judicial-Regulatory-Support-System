type UserRole = 'ADMIN' | 'CONSULTANT' | 'USER';

export interface UserInfo {
    id: number;
    email: string;
    name: string;
    nameAr?: string;
    language: 'en' | 'ar';
    isAdmin: boolean;
    loggedInUserEmail: string;
    permissions: string[];
    role: UserRole;
    avatar?: string;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
}