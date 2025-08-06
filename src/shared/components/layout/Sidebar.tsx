import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  DashboardOutlined,
  FileTextOutlined,
  CalendarOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useUserStore } from '@/features/auth/stores/userStore';
import { PAGES } from '@shared-constants/pages';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useUserStore();

  const isAdmin = userInfo?.isAdmin || false;

  // Navigation tabs configuration
  const navigationTabs = [
    {
      key: PAGES.DASHBOARD,
      label: t('NAVIGATION.DASHBOARD'),
      icon: <DashboardOutlined />,
    },
    {
      key: PAGES.CASES,
      label: t('NAVIGATION.CASES'),
      icon: <FileTextOutlined />,
    },
    {
      key: PAGES.CALENDAR,
      label: t('NAVIGATION.CALENDAR'),
      icon: <CalendarOutlined />,
    },
    ...(isAdmin ? [{
      key: PAGES.ADMIN,
      label: t('NAVIGATION.ADMIN'),
      icon: <TeamOutlined />,
    }] : [])
  ];

  // Get current active tab from location
  const getActiveTab = () => {
    const path = location.pathname.split('/')[1];
    return path || PAGES.CASES;
  };

  const handleTabClick = (key: string) => {
    navigate(`/${key}`);
  };

  const activeTab = getActiveTab();

  return (
    <div className="bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="custom-tab-container">
            <div className="flex space-x-2 p-2">
              {navigationTabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleTabClick(tab.key)}
                    className={`
                      custom-tab-button flex items-center justify-center px-6 py-3 rounded-lg font-medium text-sm
                      ${isActive 
                        ? 'active' 
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="mr-3 text-base">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 