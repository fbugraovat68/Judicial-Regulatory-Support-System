import api from '@/shared/utils/api';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface SystemSetting {
  id: number;
  key: string;
  value: string;
  description: string;
  category: string;
}

export interface AuditLog {
  id: number;
  userId: number;
  username: string;
  action: string;
  resource: string;
  resourceId?: number;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface AdminData {
  users: User[];
  settings: SystemSetting[];
  auditLogs: AuditLog[];
  statistics: {
    totalUsers: number;
    activeUsers: number;
    totalCases: number;
    totalEvents: number;
  };
}

export const adminService = {
  getAdminData: async (): Promise<AdminData> => {
    // For now, return mock data
    return {
      users: [
        {
          id: 1,
          username: 'admin',
          email: 'admin@stc.com.sa',
          fullName: 'System Administrator',
          role: 'ADMIN',
          isActive: true,
          createdAt: '2024-01-01',
          lastLogin: '2024-01-15',
        },
        {
          id: 2,
          username: 'lawyer1',
          email: 'lawyer1@stc.com.sa',
          fullName: 'John Doe',
          role: 'LAWYER',
          isActive: true,
          createdAt: '2024-01-02',
          lastLogin: '2024-01-14',
        },
        {
          id: 3,
          username: 'assistant1',
          email: 'assistant1@stc.com.sa',
          fullName: 'Jane Smith',
          role: 'ASSISTANT',
          isActive: true,
          createdAt: '2024-01-03',
          lastLogin: '2024-01-13',
        },
      ],
      settings: [
        {
          id: 1,
          key: 'system.name',
          value: 'RA Ticketing System',
          description: 'System display name',
          category: 'General',
        },
        {
          id: 2,
          key: 'system.timezone',
          value: 'Asia/Riyadh',
          description: 'System timezone',
          category: 'General',
        },
        {
          id: 3,
          key: 'security.session_timeout',
          value: '3600',
          description: 'Session timeout in seconds',
          category: 'Security',
        },
      ],
      auditLogs: [
        {
          id: 1,
          userId: 1,
          username: 'admin',
          action: 'LOGIN',
          resource: 'AUTH',
          details: 'User logged in successfully',
          timestamp: '2024-01-15T10:30:00Z',
          ipAddress: '192.168.1.100',
        },
        {
          id: 2,
          userId: 2,
          username: 'lawyer1',
          action: 'CREATE',
          resource: 'CASE',
          resourceId: 1,
          details: 'Created new case: Contract Dispute',
          timestamp: '2024-01-15T09:15:00Z',
          ipAddress: '192.168.1.101',
        },
        {
          id: 3,
          userId: 3,
          username: 'assistant1',
          action: 'UPDATE',
          resource: 'CASE',
          resourceId: 1,
          details: 'Updated case status to ACTIVE',
          timestamp: '2024-01-15T08:45:00Z',
          ipAddress: '192.168.1.102',
        },
      ],
      statistics: {
        totalUsers: 15,
        activeUsers: 12,
        totalCases: 150,
        totalEvents: 45,
      },
    };
  },

  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
  },

  getSettings: async (): Promise<SystemSetting[]> => {
    const response = await api.get('/admin/settings');
    return response.data;
  },

  updateSetting: async (id: number, value: string): Promise<SystemSetting> => {
    const response = await api.put(`/admin/settings/${id}`, { value });
    return response.data;
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    const response = await api.get('/admin/audit-logs');
    return response.data;
  },
}; 