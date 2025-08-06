import React from 'react';
import { Tag } from 'antd';
import { CaseStatus } from '@/features/cases/types/case';
import { useTranslation } from 'react-i18next';

interface StatusBadgeProps {
  status: string;
  size?: 'small' | 'default' | 'large';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();
  const getStatusColor = (status: string) => {
    switch (status) {
      case CaseStatus.IN_PROGRESS:
        return 'processing';
      case CaseStatus.HAVE_INITIAL_JUDGMENT:
        return 'warning';
      case CaseStatus.HAVE_FINAL_JUDGMENT:
        return 'success';
      case CaseStatus.CLOSED:
        return 'default';
      case CaseStatus.SEND_BACK:
        return 'error';
      case CaseStatus.UNDER_REVIEW:
        return 'processing';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case CaseStatus.IN_PROGRESS:
        return t('CASES.IN_PROGRESS');
      case CaseStatus.HAVE_INITIAL_JUDGMENT:
        return t('CASES.HAVE_INITIAL_JUDGMENT');
      case CaseStatus.HAVE_FINAL_JUDGMENT:
        return t('CASES.HAVE_FINAL_JUDGMENT');
      case CaseStatus.CLOSED:
        return t('CASES.CLOSED');
      case CaseStatus.SEND_BACK:
        return t('CASES.SEND_BACK');
      case CaseStatus.UNDER_REVIEW:
        return t('CASES.UNDER_REVIEW');
      default:
        return status;
    }
  };

  return (
    <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
  );
}; 