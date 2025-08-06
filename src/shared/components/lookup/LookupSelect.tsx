import React from 'react';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { type LookupItem, LookupTypes } from '../../types/lookup';
import { useLookup } from '../../hooks/useLookup';

interface LookupSelectProps {
  lookupType: LookupTypes;
  value?: LookupItem | number | string;
  onChange: (value: LookupItem | null) => void;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: string | null;
  showSearch?: boolean;
  filterOption?: boolean;
  optionLabelProp?: string;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
  className?: string;
  codeField?: keyof LookupItem;
}

export const LookupSelect: React.FC<LookupSelectProps> = ({
  lookupType,
  value,
  onChange,
  placeholder,
  allowClear = true,
  disabled = false,
  loading: externalLoading,
  error,
  showSearch = true,
  filterOption = true,
  optionLabelProp = 'label',
  size = 'middle',
  style,
  className,
  codeField = 'id'
}) => {
  const { t } = useTranslation();
  const { fetchLookups, getLookups, isLoading, getError } = useLookup();

  // Fetch data on mount
  React.useEffect(() => {
    fetchLookups(lookupType);
  }, [lookupType, fetchLookups]);

  const items = getLookups(lookupType) || [];
  const loading = isLoading(lookupType) || externalLoading;
  const lookupError = getError(lookupType) || error;

  // Handle value conversion
  const getValue = (): any => {
    if (!value) return undefined;
    if (typeof value === 'object') return value[codeField];
    return value;
  };

  // Handle option selection
  const handleChange = (selectedValue: number | string) => {
    const selectedItem = items.find(item => item[codeField] === selectedValue);
    onChange(selectedItem || null);
  };

  // Get display name based on current language
  const getDisplayName = (item: LookupItem) => {
    const currentLang = t('LANGUAGE') || 'en';
    return currentLang === 'ar' ? item.nameAr : item.nameEn;
  };

  // Filter options for search
  const filterOptions = (input: string, option?: any) => {
    if (!filterOption) return true;
    const item = items.find(i => i[codeField] === option?.value);
    if (!item) return false;

    const displayName = getDisplayName(item);
    return displayName.toLowerCase().includes(input.toLowerCase());
  };

  if (lookupError) {
    return (
      <div className="text-red-500 text-sm">
        {t('ERROR_LOADING_DATA')}: {lookupError}
      </div>
    );
  }

  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <Select
      value={getValue()}
      onChange={handleChange}
      placeholder={placeholder || t('PLEASE_SELECT')}
      allowClear={allowClear}
      disabled={disabled}
      loading={loading}
      showSearch={showSearch}
      filterOption={filterOptions}
      optionLabelProp={optionLabelProp}
      size={size}
      style={style}
      className={className}
      notFoundContent={loading ? <Spin size="small" /> : t('CASES.NO_DATA')}
    >
      {safeItems.map((item) => {
        const optionValue = item[codeField] as string | number;
        return (
          <Select.Option key={optionValue} value={optionValue} label={getDisplayName(item)}>
            {getDisplayName(item)}
          </Select.Option>
        );
      })}
    </Select>
  );
}; 