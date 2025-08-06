import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Result
        status="404"
        title="404"
        subTitle={t('ERRORS.NOT_FOUND')}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('COMMON.BACK')}
          </Button>
        }
      />
    </div>
  );
}; 