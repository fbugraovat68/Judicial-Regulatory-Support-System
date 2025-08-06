import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDashboard } from './hooks/useDashboard';
import { LoadingSpinner } from '@/shared/components/common/LoadingSpinner';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { formatDate } from '@/shared/utils/dateUtils';

const { Title, Text } = Typography;

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { data: dashboardData, isLoading } = useDashboard();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <Title level={2} className='mb-0'>{t('NAVIGATION.DASHBOARD')}</Title>
      
      {/* Statistics */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('TOTAL_CASES')}
              value={dashboardData?.totalCases || 0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('ACTIVE_CASES')}
              value={dashboardData?.activeCases || 0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('COMPLETED_CASES')}
              value={dashboardData?.completedCases || 0}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('PENDING_CASES')}
              value={dashboardData?.pendingCases || 0}
              valueStyle={{ color: '#fa8c16' }}
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