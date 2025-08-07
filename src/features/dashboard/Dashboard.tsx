import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDashboard } from './hooks/useDashboard';
import { LoadingSpinner } from '@/shared/components/common/LoadingSpinner';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { formatDate } from '@/shared/utils/dateUtils';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { data: dashboardData, isLoading } = useDashboard();
  const totalCases = dashboardData?.totalCases || 0;
  const activeCases = dashboardData?.activeCases || 0;
  const completedCases = dashboardData?.completedCases || 0;
  const pendingCases = dashboardData?.pendingCases || 0;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <Title level={2} className='mb-0'>{t('NAVIGATION.DASHBOARD')}</Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <Statistic
              title={<span className="text-gray-700 font-medium">{t('CASES.TOTAL_CASES')}</span>}
              value={totalCases}
              prefix={<FileTextOutlined className="text-blue-600" />}
              valueStyle={{ color: '#1e40af', fontSize: '24px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-orange-50 to-orange-100">
            <Statistic
              title={<span className="text-gray-700 font-medium">{t('CASES.ACTIVE_CASES')}</span>}
              value={activeCases}
              prefix={<ClockCircleOutlined className="text-orange-600" />}
              valueStyle={{ color: '#ea580c', fontSize: '24px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-green-50 to-green-100">
            <Statistic
              title={<span className="text-gray-700 font-medium">{t('CASES.COMPLETED_CASES')}</span>}
              value={completedCases}
              prefix={<CheckCircleOutlined className="text-green-600" />}
              valueStyle={{ color: '#16a34a', fontSize: '24px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-red-50 to-red-100">
            <Statistic
              title={<span className="text-gray-700 font-medium">{t('CASES.PENDING_CASES')}</span>}
              value={pendingCases}
              prefix={<ExclamationCircleOutlined className="text-red-600" />}
              valueStyle={{ color: '#dc2626', fontSize: '24px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and Lists */}
      <Row gutter={16}>
        <Col span={16}>
          <Card title={t('CASE_TRENDS')}>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart component coming soon
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title={t('RECENT_CASES')}>
            <List
              dataSource={dashboardData?.recentCases || []}
              renderItem={(item) => (
                <List.Item>
                  <div className="w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <Text strong>{item.name}</Text>
                        <br />
                        <Text type="secondary">{item.clientName}</Text>
                      </div>
                      <StatusBadge status={item.status} size="small" />
                    </div>
                    <div className="mt-2">
                      <Text type="secondary" className="text-xs">
                        #{item.number} • {formatDate(item.createdAt)}
                      </Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Upcoming Events */}
      <Card title={t('UPCOMING_EVENTS')}>
        <List
          dataSource={dashboardData?.upcomingEvents || []}
          renderItem={(item) => (
            <List.Item>
              <div className="w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <Text strong>{item.title}</Text>
                    <br />
                    <Text type="secondary">{item.caseName}</Text>
                  </div>
                  <Tag color="blue">{formatDate(item.date)}</Tag>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}; 