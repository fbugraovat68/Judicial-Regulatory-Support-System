import React from 'react';
import { Table, Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';

interface CasesTableProps {
    columns: any[];
    cases: any[];
    total: number;
    pageData: any;
    isLoading: boolean;
    onTableChange: (pagination: any) => void;
    onViewCase: (caseId: number) => void;
    onEditCase: (caseId: number) => void;
    onDeleteCase: (caseId: number) => void;
}

export const CasesTable: React.FC<CasesTableProps> = ({
    columns,
    cases,
    total,
    pageData,
    isLoading,
    onTableChange
}) => {
    const { t } = useTranslation();

    // Function to get row class name based on status
    const getRowClassName = (record: any) => {
        const status = record.state?.toLowerCase().replace(/_/g, '-');
        return `row-status-${status}`;
    };

    const customEmpty = (
        <Empty
            image={<FileTextOutlined style={{ fontSize: '64px', color: '#d1d5db' }} />}
            description={
                <span className="text-gray-500 text-lg">
                    {t('CASES.NO_CASES_FOUND')}
                </span>
            }
            className="py-12 overflow-hidden"
        />
    );

    return (
        <div className="overflow-hidden">
            <Table
                columns={columns}
                dataSource={cases}
                rowKey="id"
                pagination={{
                    current: pageData.page || 1,
                    pageSize: pageData.size || 10,
                    total: total || 0,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => (
                        <span className="text-gray-600 font-medium">
                            {t('CASES.SHOWING')} <span className="font-semibold text-blue-600">{range[0]}-{range[1]}</span> {t('CASES.OF')} <span className="font-semibold text-blue-600">{total}</span> {t('CASES.CASES')}
                        </span>
                    ),
                    position: ['bottomCenter'],
                    responsive: true,
                    className: "custom-pagination",
                }}
                onChange={onTableChange}
                loading={isLoading}
                locale={{
                    emptyText: customEmpty,
                }}
                className="cases-table"
                rowClassName={getRowClassName}
                scroll={{ x: 1200 }}
            />
        </div>
    );
}; 