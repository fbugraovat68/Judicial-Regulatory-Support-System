import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

interface DeleteCaseModalProps {
    visible: boolean;
    isDeleting: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteCaseModal: React.FC<DeleteCaseModalProps> = ({
    visible,
    isDeleting,
    onConfirm,
    onCancel
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            centered={true}
            closable={false}
            title={<span className='text-primary font-bold text-lg'>{t('CASES.CONFIRM_DELETE')}</span>}
            open={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            confirmLoading={isDeleting}
        >
            <p className='text-gray-600'>{t('CASES.DELETE_CASE_CONFIRMATION')}</p>
        </Modal>
    );
}; 