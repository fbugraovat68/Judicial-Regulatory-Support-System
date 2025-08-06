import React, { useState, useMemo } from 'react';
import { Button, Space, Typography } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCases } from '../hooks/useCases';
import { useFiltersStore } from '../stores/filtersStore';
import { useCaseActions } from '../hooks/useCaseActions';
import { useTableColumns } from '../hooks/useTableColumns';
import { CasesFilters } from './CasesFilters';
import { CasesTable } from './CasesTable';
import { CreateCaseModal } from './modals/CreateCaseModal';
import { DeleteCaseModal } from './modals/DeleteCaseModal';
import { useModalStore } from '@/shared/stores/modalStore';

const { Title } = Typography;

export const CasesList: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { cases, total, isLoading, refetch, deleteCase, isDeleting } = useCases();
    const { open, isOpen } = useModalStore();
    const { filters, updateFilters, resetFilters, setPageData, pageData } = useFiltersStore();

    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [caseToDelete, setCaseToDelete] = useState<number | null>(null);

    // Custom hooks for better organization
    const { handleViewCase, handleEditCase, handleDeleteCase, confirmDeleteCase } = useCaseActions({
        navigate,
        deleteCase,
        setCaseToDelete,
        setDeleteModalVisible,
        caseToDelete
    });

    const columns = useTableColumns({
        onViewCase: handleViewCase,
        onEditCase: handleEditCase,
        onDeleteCase: handleDeleteCase
    });

    // Handle search
    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    // Handle debounced search
    const handleDebouncedSearch = (value: string) => {
        const normalizedSearchKey = value.trim() || null;
        if (filters.searchKey !== normalizedSearchKey) {
            updateFilters({ searchKey: normalizedSearchKey });
        }
    };

    // Handle table pagination
    const handleTableChange = (pagination: any) => {
        setPageData({
            page: pagination.current,
            size: pagination.pageSize
        });
    };

    // Row selection
    const rowSelection = useMemo(() => ({
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    }), [selectedRowKeys]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Title level={2} className='mb-0'>{t('CASES.CASES')}</Title>
                <Space>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => refetch()}
                        loading={isLoading}
                    >
                        {t('REFRESH')}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => open('createCase')}
                    >
                        {t('CREATE_NEW_CASE')}
                    </Button>
                </Space>
            </div>

            {/* Filters */}
            <CasesFilters
                searchText={searchText}
                filters={filters}
                onSearch={handleSearch}
                onDebouncedSearch={handleDebouncedSearch}
                onFilterChange={updateFilters}
                onReset={resetFilters}
                isLoading={isLoading}
            />

            {/* Cases Table */}
            <CasesTable
                columns={columns}
                cases={cases}
                total={total}
                pageData={pageData}
                rowSelection={rowSelection}
                isLoading={isLoading}
                onTableChange={handleTableChange}
                onViewCase={handleViewCase}
                onEditCase={handleEditCase}
                onDeleteCase={handleDeleteCase}
            />

            {/* Create Case Modal */}
            {isOpen('createCase') && <CreateCaseModal />}

            {/* Delete Confirmation Modal */}
            <DeleteCaseModal
                visible={deleteModalVisible}
                onConfirm={confirmDeleteCase}
                onCancel={() => setDeleteModalVisible(false)}
                isDeleting={isDeleting}
            />
        </div>
    );
}; 