import { useMemo } from 'react';
import { Button, Tag, Dropdown } from 'antd';
import { MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { CasePriority } from '@/features/cases/types/case';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { formatDate } from '@/shared/utils/dateUtils';

interface UseTableColumnsProps {
    onViewCase: (caseId: number) => void;
    onEditCase: (caseId: number) => void;
    onDeleteCase: (caseId: number) => void;
}

export const useTableColumns = ({ onViewCase, onEditCase, onDeleteCase }: UseTableColumnsProps) => {
    const { t } = useTranslation();

    return useMemo(() => [
        {
            title: t('CASES.CASE_NUMBER'),
            dataIndex: ['caseInformation', 'caseNumber'],
            key: 'caseNumber',
            render: (caseNumber: string) => (
                <span className="font-semibold">{caseNumber}</span>
            ),
        },
        {
            title: t('CASES.CASE_NAME'),
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: any) => (
                <Button
                    type="link"
                    onClick={() => onViewCase(record.id)}
                    className="p-0 h-auto"
                >
                    {name}
                </Button>
            ),
        },
        {
            title: t('CLIENT'),
            dataIndex: 'internalClient',
            key: 'internalClient',
            render: (internalClient: any) => {
                if (internalClient && typeof internalClient === 'object') {
                    return internalClient.nameEn || internalClient.nameAr || '-';
                }
                return '-';
            },
        },
        {
            title: t('TYPE'),
            dataIndex: 'caseType',
            key: 'caseType',
            render: (caseType: any) => {
                if (caseType && typeof caseType === 'object') {
                    const typeValue = caseType.nameEn || caseType.nameAr || '-';
                    return <Tag color="blue">{typeValue}</Tag>;
                }
                return <Tag color="blue">-</Tag>;
            },
        },
        {
            title: t('STATUS'),
            dataIndex: 'state',
            key: 'state',
            render: (state: string) => {
                return <StatusBadge status={state} />;
            },
        },
        {
            title: t('PRIORITY'),
            dataIndex: ['caseInformation', 'priority'],
            key: 'priority',
            render: (priority: string) => {
                const colors = {
                    [CasePriority.LOW]: 'green',
                    [CasePriority.MEDIUM]: 'orange',
                    [CasePriority.HIGH]: 'red',
                    [CasePriority.URGENT]: 'purple',
                };
                return <Tag color={colors[priority as keyof typeof colors] || 'default'}>{t(priority)}</Tag>;
            },
        },
        {
            title: t('ASSIGNED_TO'),
            dataIndex: 'assignedConsultantName',
            key: 'assignedConsultantName',
            render: (assignedConsultantName: string) => {
                return assignedConsultantName || '-';
            },
        },
        {
            title: t('CREATED_DATE'),
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (date: string) => formatDate(date),
        },
        {
            title: t('CASES.ACTIONS'),
            key: 'actions',
            render: (_: any, record: any) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'view',
                                icon: <EyeOutlined />,
                                label: t('VIEW'),
                                onClick: () => onViewCase(record.id),
                            },
                            {
                                key: 'edit',
                                icon: <EditOutlined />,
                                label: t('EDIT'),
                                onClick: () => onEditCase(record.id),
                            },
                            {
                                key: 'delete',
                                icon: <DeleteOutlined />,
                                label: t('DELETE'),
                                onClick: () => onDeleteCase(record.id),
                                danger: true,
                            },
                        ],
                    }}
                    trigger={['click']}
                >
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ], [t, onViewCase, onEditCase, onDeleteCase]);
}; 