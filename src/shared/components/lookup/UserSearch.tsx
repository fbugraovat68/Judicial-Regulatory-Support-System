import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import type { User } from '../../types/lookup';
import { useLookup } from '../../hooks/useLookup';

interface ConsultantSearchProps {
    value?: User | number | string;
    onChange: (value: User | null) => void;
    placeholder?: string;
    allowClear?: boolean;
    disabled?: boolean;
    size?: 'small' | 'middle' | 'large';
    style?: React.CSSProperties;
    className?: string;
    debounceMs?: number;
}

export const ConsultantSearch: React.FC<ConsultantSearchProps> = ({
    value,
    onChange,
    placeholder,
    allowClear = true,
    disabled = false,
    size = 'middle',
    style,
    className,
    debounceMs = 300
}) => {
    const { t } = useTranslation();
    const { searchConsultants } = useLookup();

    const [consultants, setConsultants] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchValue.trim()) {
                setLoading(true);
                try {
                    const results = await searchConsultants(searchValue);
                    setConsultants(results);
                } catch (error) {
                    console.error('Search error:', error);
                    setConsultants([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setConsultants([]);
            }
        }, debounceMs);

        return () => clearTimeout(timeoutId);
    }, [searchValue, searchConsultants, debounceMs]);

    // Handle value conversion
    const getValue = () => {
        if (!value) return undefined;
        if (typeof value === 'object') return value.id;
        return value;
    };

    // Handle option selection
    const handleChange = (selectedValue: number | string) => {
        const selectedConsultant = consultants.find(consultant => consultant.id === selectedValue);
        onChange(selectedConsultant || null);
    };

    // Handle search input change
    const handleSearch = (input: string) => {
        setSearchValue(input);
    };

    // Get display name based on current language
    const getDisplayName = (consultant: User) => {
        const currentLang = t('LANGUAGE') || 'en';
        return currentLang === 'ar' ? consultant.nameAr : consultant.nameEn;
    };

    return (
        <Select
            value={getValue()}
            onChange={handleChange}
            onSearch={handleSearch}
            placeholder={placeholder || t('SEARCH_CONSULTANTS')}
            allowClear={allowClear}
            disabled={disabled}
            loading={loading}
            showSearch
            filterOption={false}
            size={size}
            style={style}
            className={className}
            notFoundContent={loading ? <Spin size="small" /> : t('NO_DATA')}
        >
            {consultants.map((consultant) => (
                <Select.Option key={consultant.id} value={consultant.id} label={getDisplayName(consultant)}>
                    <div>
                        <div>{getDisplayName(consultant)}</div>
                        {consultant.email && (
                            <div className="text-xs text-gray-500">{consultant.email}</div>
                        )}
                    </div>
                </Select.Option>
            ))}
        </Select>
    );
}; 