import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLookup } from '@/shared/hooks/useLookup';
import { useDebounce } from '@/shared/hooks/useDebounce';
import type { Consultant } from '@/shared/types/lookup';

interface ConsultantSearchProps {
    value?: Consultant[] | Consultant | number | string;
    onChange?: (value: Consultant[] | Consultant | null) => void;
    placeholder?: string;
    allowClear?: boolean;
    disabled?: boolean;
    size?: 'small' | 'middle' | 'large';
    style?: React.CSSProperties;
    className?: string;
    debounceMs?: number;
    mode?: 'multiple' | 'tags';
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
    debounceMs = 300,
    mode = 'multiple'
}) => {
    const { t } = useTranslation();
    const { searchConsultants } = useLookup();

    const [consultants, setConsultants] = useState<Consultant[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [debouncedSearchValue, isDebouncing] = useDebounce(searchValue, debounceMs);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            try {
                const results = await searchConsultants(debouncedSearchValue);
                setConsultants(results);
            } catch (error) {
                console.error('Search error:', error);
                setConsultants([]);
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [debouncedSearchValue, searchConsultants]);

    const handleSearch = (newValue: string) => {
        setSearchValue(newValue);
    };

    const getValue = () => {
        if (!value) return undefined;
        if (Array.isArray(value)) {
            return value.map(item => typeof item === 'object' ? item.id : item);
        }
        if (typeof value === 'object') return value.id;
        return value;
    };

    const handleChange = (selectedValue: number | string | (number | string)[]) => {
        if (Array.isArray(selectedValue)) {
            const selectedConsultants = selectedValue.map(id =>
                consultants.find(consultant => consultant.id === id)
            ).filter(Boolean) as Consultant[];
            onChange?.(selectedConsultants);
        } else {
            const selectedConsultant = consultants.find(consultant => consultant.id === selectedValue);
            onChange?.(selectedConsultant || null);
        }
    };

    const getDisplayName = (consultant: Consultant) => {
        const currentLang = t('LANGUAGE') || 'en';
        return currentLang === 'ar' ? consultant.nameAr : consultant.name;
    };

    return (
        <Select
            showSearch
            value={getValue()}
            onChange={handleChange}
            onSearch={handleSearch}
            placeholder={placeholder || t('CASES.SEARCH_CONSULTANTS')}
            allowClear={allowClear}
            disabled={disabled}
            loading={loading || isDebouncing}
            filterOption={false}
            defaultActiveFirstOption={false}
            mode={mode}
            size={size}
            style={style}
            className={className}
            notFoundContent={loading || isDebouncing ? <Spin size="small" /> : t('CASES.NO_DATA')}
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