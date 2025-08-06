import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Litigant } from '@/shared/types/lookup';
import { useLookup } from '@/shared/hooks/useLookup';

interface LitigantSearchProps {
    value?: Litigant[] | Litigant | number | string;
    onChange: (value: Litigant[] | Litigant | null) => void;
    placeholder?: string;
    allowClear?: boolean;
    disabled?: boolean;
    size?: 'small' | 'middle' | 'large';
    style?: React.CSSProperties;
    className?: string;
    debounceMs?: number;
    mode?: 'multiple' | 'tags';
}

export const LitigantSearch: React.FC<LitigantSearchProps> = ({
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
    const { searchLitigants } = useLookup();

    const [litigants, setLitigants] = useState<Litigant[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchValue.trim()) {
                setLoading(true);
                try {
                    const results = await searchLitigants(searchValue);
                    setLitigants(results);
                } catch (error) {
                    console.error('Search error:', error);
                    setLitigants([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setLitigants([]);
            }
        }, debounceMs);

        return () => clearTimeout(timeoutId);
    }, [searchValue, searchLitigants, debounceMs]);

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
            const selectedLitigants = selectedValue.map(id => 
                litigants.find(litigant => litigant.id === id)
            ).filter(Boolean) as Litigant[];
            onChange(selectedLitigants);
        } else {
            const selectedLitigant = litigants.find(litigant => litigant.id === selectedValue);
            onChange(selectedLitigant || null);
        }
    };

    const handleSearch = (input: string) => {
        setSearchValue(input);
    };

    const getDisplayName = (litigant: Litigant) => {
        const currentLang = t('LANGUAGE') || 'en';
        return currentLang === 'ar' ? litigant.nameAr : litigant.name;
    };

    return (
        <Select
            value={getValue()}
            onChange={handleChange}
            onSearch={handleSearch}
            placeholder={placeholder || t('SEARCH_LITIGANTS')}
            allowClear={allowClear}
            disabled={disabled}
            loading={loading}
            showSearch
            filterOption={false}
            mode={mode}
            size={size}
            style={style}
            className={className}
            notFoundContent={loading ? <Spin size="small" /> : t('NO_DATA')}
        >
            {litigants.map((litigant) => (
                <Select.Option key={litigant.id} value={litigant.id} label={getDisplayName(litigant)}>
                    <div>
                        <div>{getDisplayName(litigant)}</div>
                        {litigant.email && (
                            <div className="text-xs text-gray-500">{litigant.email}</div>
                        )}
                    </div>
                </Select.Option>
            ))}
        </Select>
    );
}; 