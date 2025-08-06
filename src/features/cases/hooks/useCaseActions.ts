import { useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

interface UseCaseActionsProps {
    navigate: (path: string) => void;
    deleteCase: (id: number) => void;
    setCaseToDelete: (id: number | null) => void;
    setDeleteModalVisible: (visible: boolean) => void;
    caseToDelete: number | null;
}

export const useCaseActions = ({
    navigate,
    deleteCase,
    setCaseToDelete,
    setDeleteModalVisible,
    caseToDelete
}: UseCaseActionsProps) => {
    const { t } = useTranslation();

    const handleViewCase = useCallback((caseId: number) => navigate(`/cases/${caseId}`), [navigate]);
    const handleEditCase = useCallback((caseId: number) => message.info(t('CASES.EDIT_FUNCTIONALITY_COMING'), caseId), [t]);
    const handleDeleteCase = useCallback((caseId: number) => {
        setCaseToDelete(caseId);
        setDeleteModalVisible(true);
    }, [setCaseToDelete, setDeleteModalVisible]);

    const confirmDeleteCase = useCallback(async () => {
        if (caseToDelete) {
            try {
                deleteCase(caseToDelete);
                message.success(t('CASES.CASE_DELETED_SUCCESS'));
                setDeleteModalVisible(false);
                setCaseToDelete(null);
            } catch (error) {
                message.error(t('CASES.CASE_DELETE_FAILED'));
            }
        }
    }, [caseToDelete, deleteCase, setDeleteModalVisible, setCaseToDelete, t]);

    return {
        handleViewCase,
        handleEditCase,
        handleDeleteCase,
        confirmDeleteCase
    };
}; 