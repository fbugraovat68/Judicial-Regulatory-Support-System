import { useMemo } from 'react';
import { Button, Tag, Dropdown, Avatar, Tooltip } from 'antd';
import { MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
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
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {t('CASES.CASE_NUMBER')}
                </span>
            ),
            dataIndex: ['caseInformation', 'caseNumber'],
            key: 'caseNumber',
            width: 140,
            render: (caseNumber: string) => (
                <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                    {caseNumber || '-'}
                </span>
            ),
        },
        {
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {t('CASES.CASE_NAME')}
                </span>
            ),
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: (name: string, record: any) => (
                <Tooltip title={t('VIEW_CASE_DETAILS')}>
                    <Button
                        type="link"
                        onClick={() => onViewCase(record.id)}
                        className="p-0 h-auto text-left font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    >
                        {name}
                    </Button>
                </Tooltip>
            ),
        },
        {
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    {t('CLIENT')}
                </span>
            ),
            dataIndex: 'internalClient',
            key: 'internalClient',
            width: 150,
            render: (internalClient: any) => {
                if (internalClient && typeof internalClient === 'object') {
                    const clientName = internalClient.nameEn || internalClient.nameAr || '-';
                    return (
                        <div className="flex items-center">
                            <Avatar size="small" icon={<UserOutlined />} className="mr-2 bg-purple-100 text-purple-600" />
                            <span className="text-gray-700 font-medium">{clientName}</span>
                        </div>
                    );
                }
                return (
                    <div className="flex items-center">
                        <Avatar size="small" icon={<UserOutlined />} className="mr-2 bg-gray-100 text-gray-400" />
                        <span className="text-gray-400">-</span>
                    </div>
                );
            },
        },
        {
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    {t('TYPE')}
                </span>
            ),
            dataIndex: 'caseType',
            key: 'caseType',
            width: 120,
            render: (caseType: any) => {
                if (caseType && typeof caseType === 'object') {
                    const typeValue = caseType.nameEn || caseType.nameAr || '-';
                    return (
                        <Tag color="orange" className="px-3 py-1 rounded-full font-medium border-0">
                            {typeValue}
                        </Tag>
                    );
                }
                return (
                    <Tag color="default" className="px-3 py-1 rounded-full font-medium border-0">
                        -
                    </Tag>
                );
            },
        },
        {
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    {t('STATUS')}
                </span>
            ),
            dataIndex: 'state',
            key: 'state',
            width: 120,
            render: (state: string) => {
                return <StatusBadge status={state} />;
            },
        },
        {
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {t('PRIORITY')}
                </span>
            ),
            dataIndex: ['caseInformation', 'priority'],
            key: 'priority',
            width: 100,
            render: (priority: string) => {
                const colors = {
                    [CasePriority.LOW]: 'green',
                    [CasePriority.MEDIUM]: 'orange',
                    [CasePriority.HIGH]: 'red'
                };
                const color = colors[priority as keyof typeof colors] || 'default';
                return (
                    <Tag 
                        color={color} 
                        className="px-3 py-1 rounded-full font-medium border-0 text-white"
                    >
                        {t(priority)}
                    </Tag>
                );
            },
        },
        {
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    {t('ASSIGNED_TO')}
                </span>
            ),
            dataIndex: 'assignedConsultantName',
            key: 'assignedConsultantName',
            width: 150,
            render: (assignedConsultantName: string) => {
                return assignedConsultantName ? (
                    <div className="flex items-center">
                        <Avatar size="small" icon={<UserOutlined />} className="mr-2 bg-teal-100 text-teal-600" />
                        <span className="text-gray-700 font-medium">{assignedConsultantName}</span>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Avatar size="small" icon={<UserOutlined />} className="mr-2 bg-gray-100 text-gray-400" />
                        <span className="text-gray-400">-</span>
                    </div>
                );
            },
        },
        {
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <CalendarOutlined className="mr-2 text-gray-500" />
                    {t('CREATED_DATE')}
                </span>
            ),
            dataIndex: 'createdDate',
            key: 'createdDate',
            width: 120,
            render: (date: string) => (
                <span className="text-gray-600 font-medium">
                    {formatDate(date)}
                </span>
            ),
        },
        {
            title: (
                <span className="font-semibold text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                    {t('CASES.ACTIONS')}
                </span>
            ),
            key: 'actions',
            width: 80,
            fixed: 'right' as const,
            render: (_: any, record: any) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'view',
                                icon: <EyeOutlined className="text-blue-600" />,
                                label: <span className="text-blue-600 font-medium">{t('VIEW')}</span>,
                                onClick: () => onViewCase(record.id),
                            },
                            {
                                key: 'edit',
                                icon: <EditOutlined className="text-orange-600" />,
                                label: <span className="text-orange-600 font-medium">{t('EDIT')}</span>,
                                onClick: () => onEditCase(record.id),
                            },
                            {
                                key: 'delete',
                                icon: <DeleteOutlined className="text-red-600" />,
                                label: <span className="text-red-600 font-medium">{t('DELETE')}</span>,
                                onClick: () => onDeleteCase(record.id),
                                danger: true,
                            },
                        ],
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <Button 
                        type="text" 
                        icon={<MoreOutlined />} 
                        className="hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                    />
                </Dropdown>
            ),
        },
    ], [t, onViewCase, onEditCase, onDeleteCase]);
}; 