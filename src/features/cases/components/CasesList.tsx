import React, { useState } from 'react';
import { Button, Space, Typography, Card } from 'antd';
import { PlusOutlined, ReloadOutlined, FileTextOutlined } from '@ant-design/icons';
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
    const { open } = useModalStore();
    const { filters, updateFilters, resetFilters, setPageData, pageData } = useFiltersStore();

    const [searchText, setSearchText] = useState('');
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

    return (
        <div className="space-y-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <Title level={2} className="mb-0 text-gray-800 flex items-center">
                            <FileTextOutlined className="mr-3 text-blue-600 text-2xl" />
                            {t('CASES.CASES')}
                        </Title>
                    </div>
                    <Space size="middle">
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => refetch()}
                            loading={isLoading}
                            size="large"
                            className="flex items-center px-4 py-2 h-10"
                        >
                            {t('REFRESH')}
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => open('createCase')}
                            size="large"
                            className="flex items-center px-6 py-2 h-10 bg-blue-600 hover:bg-blue-700 border-blue-600"
                        >
                            {t('CREATE_NEW_CASE')}
                        </Button>
                    </Space>
                </div>
            </div>

            {/* Filters Section */}
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
            <Card className="shadow-sm bg-white rounded-xl overflow-hidden border border-gray-200">
                <CasesTable
                    columns={columns}
                    cases={cases || []}
                    total={total || 0}
                    pageData={pageData}
                    isLoading={isLoading}
                    onTableChange={handleTableChange}
                    onViewCase={handleViewCase}
                    onEditCase={handleEditCase}
                    onDeleteCase={handleDeleteCase}
                />
            </Card>

            {/* Modals */}
            <CreateCaseModal />
            <DeleteCaseModal
                visible={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                onConfirm={confirmDeleteCase}
                isDeleting={isDeleting}
            />
        </div>
    );
}; 