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
            title={t('CASES.CONFIRM_DELETE')}
            open={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            confirmLoading={isDeleting}
        >
            <p>{t('CASES.DELETE_CASE_CONFIRMATION')}</p>
        </Modal>
    );
}; 