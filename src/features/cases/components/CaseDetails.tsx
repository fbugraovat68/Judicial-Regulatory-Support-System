import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tabs, Dropdown, Typography } from 'antd';
import { ArrowLeftOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useCase } from '@/features/cases/hooks/useCases';
import { useModalStore } from '@/shared/stores/modalStore';
import { LoadingSpinner } from '@/shared/components/common/LoadingSpinner';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { CreateCaseModal } from './modals/CreateCaseModal';
import { formatDate } from '@/shared/utils/dateUtils';

const { Title } = Typography;

export const CaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { open, isOpen } = useModalStore();
  const { case: caseDetails, isLoading, error } = useCase(Number(id));

  const handleEdit = () => {
    open('createCase');
  };

  const handleBack = () => {
    navigate('/cases');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !caseDetails) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{t('CASE_NOT_FOUND')}</p>
        <Button onClick={handleBack} className="mt-4">
          {t('BACK')}
        </Button>
      </div>
    );
  }

  const tabItems = [
    {
      key: 'info',
      label: t('CASE_INFO'),
      children: <CaseInfo case={caseDetails} />,
    },
    {
      key: 'documents',
      label: t('CASE_DOCUMENTS'),
      children: <CaseDocuments caseId={caseDetails.id} />,
    },
    {
      key: 'notes',
      label: t('NOTES'),
      children: <CaseNotes caseId={caseDetails.id} />,
    },
    {
      key: 'team',
      label: t('TEAM_MEMBERS'),
      children: <CaseTeamMembers caseId={caseDetails.id} />,
    },
    {
      key: 'results',
      label: t('RESULTS_DETAILS'),
      children: <ResultDetails caseId={caseDetails.id} />,
    },
    {
      key: 'events',
      label: t('UPCOMING_EVENTS'),
      children: <UpcomingEvents caseId={caseDetails.id} />,
    },
  ];

  const actionMenuItems = [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: t('EDIT_CASE'),
      onClick: handleEdit,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            type="text"
          >
            {t('BACK')}
          </Button>
          <div>
            <Title level={2}>{caseDetails.name}</Title>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-gray-500">#{caseDetails.caseInformation.caseNumber}</span>
              <StatusBadge status={caseDetails.state} />
            </div>
          </div>
        </div>
        
        <Dropdown
          menu={{ items: actionMenuItems }}
          placement="bottomRight"
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      </div>

      {/* Tabs */}
      <Tabs items={tabItems} />

      {/* Create/Edit Case Modal */}
      {isOpen('createCase') && (
        <CreateCaseModal />
      )}
    </div>
  );
};

// Placeholder components - these will be implemented separately
const CaseInfo: React.FC<{ case: any }> = ({ case: caseData }) => (
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-4">{caseData.name}</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <strong>Client:</strong> {caseData.clientName}
      </div>
      <div>
        <strong>Type:</strong> {caseData.caseType}
      </div>
      <div>
        <strong>Priority:</strong> {caseData.priority}
      </div>
      <div>
        <strong>Created:</strong> {formatDate(caseData.createdAt)}
      </div>
    </div>
  </div>
);

const CaseDocuments: React.FC<{ caseId: number }> = ({ caseId }) => (
  <div className="p-6">
    <p>Documents for case {caseId} - Coming soon</p>
  </div>
);

const CaseNotes: React.FC<{ caseId: number }> = ({ caseId }) => (
  <div className="p-6">
    <p>Notes for case {caseId} - Coming soon</p>
  </div>
);

const CaseTeamMembers: React.FC<{ caseId: number }> = ({ caseId }) => (
  <div className="p-6">
    <p>Team members for case {caseId} - Coming soon</p>
  </div>
);

const ResultDetails: React.FC<{ caseId: number }> = ({ caseId }) => (
  <div className="p-6">
    <p>Result details for case {caseId} - Coming soon</p>
  </div>
);

const UpcomingEvents: React.FC<{ caseId: number }> = ({ caseId }) => (
  <div className="p-6">
    <p>Upcoming events for case {caseId} - Coming soon</p>
  </div>
); 