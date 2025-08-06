import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLookup } from '@/shared/hooks/useLookup';
import type { Consultant } from '@/shared/types/lookup';

interface ConsultantSearchProps {
  value?: Consultant[] | Consultant | null;
  onChange?: (value: Consultant[] | Consultant | null) => void;
  placeholder?: string;
  debounceMs?: number;
  disabled?: boolean;
  mode?: 'multiple' | 'tags';
}

export const ConsultantSearch: React.FC<ConsultantSearchProps> = ({
  value,
  onChange,
  placeholder,
  debounceMs = 500,
  disabled = false,
  mode = 'multiple'
}) => {
  const { t } = useTranslation();
  const { searchConsultants } = useLookup();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const searchConsultantsData = async () => {
      if (!searchValue.trim()) {
        setConsultants([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchConsultants(searchValue);
        setConsultants(results);
      } catch (error) {
        console.error('Error searching consultants:', error);
        setConsultants([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchConsultantsData, debounceMs);
    return () => clearTimeout(timeoutId);
  }, [searchValue, searchConsultants, debounceMs]);

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
      placeholder={placeholder || t('SEARCH_CONSULTANTS')}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={loading ? <Spin size="small" /> : null}
      disabled={disabled}
      allowClear
      mode={mode}
      style={{ width: '100%' }}
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