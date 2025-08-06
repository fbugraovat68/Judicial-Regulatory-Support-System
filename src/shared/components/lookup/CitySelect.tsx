import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import type { LookupItem } from '../../types/lookup';
import { useLookup } from '../../hooks/useLookup';

interface CitySelectProps {
  districtId: number | null;
  value?: LookupItem | number | string;
  onChange: (value: LookupItem | null) => void;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
  className?: string;
}

export const CitySelect: React.FC<CitySelectProps> = ({
  districtId,
  value,
  onChange,
  placeholder,
  allowClear = true,
  disabled = false,
  size = 'middle',
  style,
  className
}) => {
  const { t } = useTranslation();
  const { fetchCitiesByRegion, getCitiesByRegion } = useLookup();

  // Fetch cities when district changes
  useEffect(() => {
    fetchCitiesByRegion(districtId);
  }, [districtId, fetchCitiesByRegion]);

  const cities = getCitiesByRegion(districtId);

  // Handle value conversion
  const getValue = () => {
    if (!value) return undefined;
    if (typeof value === 'object') return value.id;
    return value;
  };

  // Handle option selection
  const handleChange = (selectedValue: number | string) => {
    const selectedCity = cities.find(city => city.id === selectedValue);
    onChange(selectedCity || null);
  };

  // Get display name based on current language
  const getDisplayName = (city: LookupItem) => {
    const currentLang = t('LANGUAGE') || 'en';
    return currentLang === 'ar' ? city.nameAr : city.nameEn;
  };

  // Filter options for search
  const filterOptions = (input: string, option?: any) => {
    const city = cities.find(c => c.id === option?.value);
    if (!city) return false;
    
    const displayName = getDisplayName(city);
    return displayName.toLowerCase().includes(input.toLowerCase());
  };

  return (
    <Select
      value={getValue()}
      onChange={handleChange}
      placeholder={placeholder || t('SELECT_CITY')}
      allowClear={allowClear}
      disabled={disabled || !districtId}
      showSearch
      filterOption={filterOptions}
      size={size}
      style={style}
      className={className}
      notFoundContent={!districtId ? t('PLEASE_SELECT_DISTRICT_FIRST') : t('NO_CITIES_FOUND')}
    >
      {cities.map((city) => (
        <Select.Option key={city.id} value={city.id} label={getDisplayName(city)}>
          {getDisplayName(city)}
        </Select.Option>
      ))}
    </Select>
  );
}; 