import React, { useState } from 'react';
import { Card, DatePicker, Button, Space, Row, Col, Typography, Divider, Badge } from 'antd';
import { FilterOutlined, ClearOutlined, ReloadOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { CasesFilterCriteria } from '@/features/cases/types/case';
import { LookupSelect } from '@/shared/components/lookup';
import { LookupTypes } from '@/shared/types/lookup';
import { SearchInput } from '@/shared/components/common/SearchInput';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

interface CasesFiltersProps {
    searchText: string;
    filters: CasesFilterCriteria;
    onSearch: (value: string) => void;
    onDebouncedSearch: (value: string) => void;
    onFilterChange: (filters: Partial<CasesFilterCriteria>) => void;
    onReset: () => void;
    isLoading?: boolean;
}

export const CasesFilters: React.FC<CasesFiltersProps> = ({
    searchText,
    filters,
    onSearch,
    onDebouncedSearch,
    onFilterChange,
    onReset,
    isLoading = false
}) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    // Handle filter changes
    const handleFilterChange = (key: keyof CasesFilterCriteria, value: any) => {
        onFilterChange({ [key]: value });
    };

    // Handle date range change
    const handleDateRangeChange = (dates: any) => {
        if (dates) {
            onFilterChange({
                fromPeriod: dates[0]?.format('YYYY-MM-DD'),
                toPeriod: dates[1]?.format('YYYY-MM-DD')
            });
        } else {
            onFilterChange({
                fromPeriod: undefined,
                toPeriod: undefined
            });
        }
    };

    // Count active filters
    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.state) count++;
        if (filters.finalResultId) count++;
        if (filters.lawsuitTypeId) count++;
        if (filters.courtId) count++;
        if (filters.fromPeriod || filters.toPeriod) count++;
        return count;
    };

    const activeFiltersCount = getActiveFiltersCount();

    return (
        <Card className="cases-filters-card border border-gray-200 rounded-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                    <FilterOutlined className="text-blue-500 text-lg" />
                    <Title level={4} className="mb-0 text-gray-800">
                        {t('CASES.FILTERS')}
                    </Title>
                    {activeFiltersCount > 0 && (
                        <Badge
                            count={activeFiltersCount}
                            style={{ backgroundColor: '#1890ff' }}
                            className="ml-2"
                        />
                    )}
                </div>
                <Space>
                    <Button
                        type="text"
                        icon={isExpanded ? <MinusOutlined /> : <PlusOutlined />}
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-600 hover:text-blue-500"
                    >
                        {isExpanded ? t('CASES.COLLAPSE') : t('CASES.EXPAND')}
                    </Button>
                    {activeFiltersCount > 0 && (
                        <Button
                            type="text"
                            icon={<ClearOutlined />}
                            onClick={onReset}
                            className="text-red-500 hover:text-red-600"
                        >
                            {t('CASES.CLEAR_ALL')}
                        </Button>
                    )}
                </Space>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
                <SearchInput
                    value={searchText}
                    onChange={onSearch}
                    onSearch={onDebouncedSearch}
                    isLoading={isLoading}
                />
            </div>

            {/* Filters */}
            <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <Divider className="my-4" />

                <Row gutter={[16, 16]}>
                    {/* Status Filter */}
                    <Col xs={24} sm={12} md={6}>
                        <div className="filter-item">
                            <Text strong className="block mb-2 text-gray-700">
                                {t('CASES.STATUS')}
                            </Text>
                            <LookupSelect
                                lookupType={LookupTypes.States}
                                value={filters.state || undefined}
                                onChange={(value) => handleFilterChange('state', value?.code || null)}
                                placeholder={t('CASES.SELECT_STATUS')}
                                allowClear
                                size="middle"
                                style={{ width: '100%' }}
                                codeField="code"
                            />
                        </div>
                    </Col>

                    {/* Priority Filter */}
                    <Col xs={24} sm={12} md={6}>
                        <div className="filter-item">
                            <Text strong className="block mb-2 text-gray-700">
                                {t('CASES.PRIORITY')}
                            </Text>
                            <LookupSelect
                                lookupType={LookupTypes.JudgmentResult}
                                value={filters.finalResultId || undefined}
                                onChange={(value) => handleFilterChange('finalResultId', value?.id || null)}
                                placeholder={t('CASES.SELECT_PRIORITY')}
                                allowClear
                                size="middle"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>

                    {/* Case Type Filter */}
                    <Col xs={24} sm={12} md={6}>
                        <div className="filter-item">
                            <Text strong className="block mb-2 text-gray-700">
                                {t('CASES.TYPE')}
                            </Text>
                            <LookupSelect
                                lookupType={LookupTypes.CaseType}
                                value={filters.lawsuitTypeId || undefined}
                                onChange={(value) => handleFilterChange('lawsuitTypeId', value?.id || null)}
                                placeholder={t('CASES.SELECT_TYPE')}
                                allowClear
                                size="middle"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>

                    {/* Court Filter */}
                    <Col xs={24} sm={12} md={6}>
                        <div className="filter-item">
                            <Text strong className="block mb-2 text-gray-700">
                                {t('CASES.COURT')}
                            </Text>
                            <LookupSelect
                                lookupType={LookupTypes.Courts}
                                value={filters.courtId || undefined}
                                onChange={(value) => handleFilterChange('courtId', value?.id || null)}
                                placeholder={t('CASES.SELECT_COURT')}
                                allowClear
                                size="middle"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>

                    {/* Date Range Filter */}
                    <Col xs={24} sm={24} md={12}>
                        <div className="filter-item">
                            <Text strong className="block mb-2 text-gray-700">
                                {t('CASES.DATE_RANGE')}
                            </Text>
                            <RangePicker
                                placeholder={[t('CASES.DATE_FROM'), t('CASES.DATE_TO')]}
                                onChange={handleDateRangeChange}
                                size="middle"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>

                    {/* Action Buttons */}
                    <Col xs={24} sm={24} md={12}>
                        <div className="flex items-end h-full">
                            <Space className="w-full flex justify-end items-end gap-2">
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={onReset}
                                >
                                    {t('CASES.CLEAR')}
                                </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <Text type="secondary" className="text-sm">
                        {t('CASES.ACTIVE_FILTERS', { count: activeFiltersCount })}
                    </Text>
                </div>
            )}
        </Card>
    );
}; 