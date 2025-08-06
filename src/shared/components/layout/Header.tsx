import React, { useEffect } from 'react';
import { Button, Dropdown, Space, Avatar, Badge, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  UserOutlined, 
  SettingOutlined, 
  GlobalOutlined, 
  BellOutlined
} from '@ant-design/icons';
import { useUserStore } from '@features/auth/stores/userStore';
import { useNotificationStore } from '@shared-stores/notificationStore';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { unreadCount } = useNotificationStore();

  const isRTL = i18n.language === 'ar';

  // Set document direction based on language
  useEffect(() => {
    if (document.documentElement) {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language, isRTL]);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('NAVIGATION.PROFILE'),
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('NAVIGATION.SETTINGS'),
      onClick: () => navigate('/settings'),
    }
  ];

  const languageMenuItems = [
    {
      key: 'en',
      label: 'English',
      icon: '🇺🇸',
      onClick: () => handleLanguageChange('en'),
    },
    {
      key: 'ar',
      label: 'العربية',
      icon: '🇸🇦',
      onClick: () => handleLanguageChange('ar'),
    },
  ];

  const notificationMenuItems = [
    {
      key: 'all',
      label: t('NAVIGATION.VIEW_ALL_NOTIFICATIONS'),
      onClick: () => navigate('/notifications'),
    },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RA</span>
              </div>
              <h1 className="text-xl font-bold text-primary hidden sm:block">
                {t('APP_TITLE')}
              </h1>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Tooltip title={t('NAVIGATION.CHANGE_LANGUAGE')}>
              <Dropdown
                menu={{ items: languageMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button
                  icon={<GlobalOutlined />}
                  type="text"
                  className="flex items-center space-x-1 hover:bg-gray-50"
                >
                  <span className="hidden sm:inline">
                    {i18n.language === 'ar' ? 'العربية' : 'English'}
                  </span>
                </Button>
              </Dropdown>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title={t('NAVIGATION.NOTIFICATIONS')}>
              <Dropdown
                menu={{ items: notificationMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Badge count={unreadCount} size="small">
                  <Button
                    icon={<BellOutlined />}
                    type="text"
                    className="flex items-center justify-center hover:bg-gray-50"
                  />
                </Badge>
              </Dropdown>
            </Tooltip>

            {/* User Menu */}
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Space className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                <Avatar
                  icon={<UserOutlined />}
                  className="bg-primary"
                  size="small"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {userInfo?.name || t('NAVIGATION.USER')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {userInfo?.email}
                  </div>
                </div>
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}; 