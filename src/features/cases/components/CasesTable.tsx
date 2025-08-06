import React from 'react';
import { Card, Table } from 'antd';
import { useTranslation } from 'react-i18next';

interface CasesTableProps {
    columns: any[];
    cases: any[];
    total: number;
    pageData: any;
    rowSelection: any;
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
    rowSelection,
    isLoading,
    onTableChange
}) => {
    const { t } = useTranslation();

    return (
        <Card>
            <Table
                columns={columns}
                dataSource={cases}
                rowKey="id"
                rowSelection={rowSelection}
                pagination={{
                    current: pageData.page || 1,
                    pageSize: pageData.size || 10,
                    total: total || 0,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${t('CASES.SHOWING')} ${range[0]}-${range[1]} ${t('CASES.OF')} ${total} ${t('CASES.CASES')}`,
                    position: ['bottomCenter'],
                    responsive: true,
                }}
                onChange={onTableChange}
                loading={isLoading}
                locale={{
                    emptyText: t('CASES.NO_CASES_FOUND'),
                }}
            />
        </Card>
    );
}; 