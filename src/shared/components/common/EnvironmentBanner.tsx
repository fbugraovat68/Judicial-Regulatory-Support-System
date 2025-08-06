import React from 'react';
import { Alert } from 'antd';
import { environment } from '@/config';

export const EnvironmentBanner: React.FC = () => {
    if (environment.environment === 'production') {
        return null;
    }

    const getBannerColor = () => {
        switch (environment.environment) {
            case 'development':
                return 'info';
            case 'staging':
                return 'warning';
            default:
                return 'success';
        }
    };

    const getBannerMessage = () => {
        switch (environment.environment) {
            case 'development':
                return `Development Environment - ${environment.name} v${environment.version}`;
            case 'staging':
                return `Staging Environment - ${environment.name} v${environment.version}`;
            default:
                return `${environment.environment} Environment`;
        }
    };

    return (
        <Alert
            message={getBannerMessage()}
            type={getBannerColor()}
            banner
            showIcon={false}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                textAlign: 'center',
                fontWeight: 'bold',
            }}
        />
    );
}; 