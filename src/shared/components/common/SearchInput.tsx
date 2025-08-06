import React from 'react';
import { Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  debounceDelay?: number;
  size?: 'small' | 'middle' | 'large';
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder,
  isLoading = false,
  debounceDelay = 500,
  size = 'large',
  allowClear = true,
  className = '',
  style = {}
}) => {
  const { t } = useTranslation();
  
  // Use the debounce hook
  const [debouncedValue, isDebouncing] = useDebounce(value, debounceDelay);

  // Trigger search when debounced value changes
  React.useEffect(() => {
    // Normalize empty string to null to prevent duplicate API calls
    const normalizedSearchKey = debouncedValue.trim() || null;
    onSearch(normalizedSearchKey || '');
  }, [debouncedValue, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const getPlaceholder = () => {
    if (isDebouncing) return t('CASES.SEARCHING');
    if (placeholder) return placeholder;
    return t('CASES.SEARCH_CASES_PLACEHOLDER');
  };

  const getPrefix = () => {
    if (isLoading) return <Spin size="small" />;
    if (isDebouncing) return <Spin size="small" />;
    return <SearchOutlined className="text-gray-400" />;
  };

  return (
    <Input
      placeholder={getPlaceholder()}
      prefix={getPrefix()}
      value={value}
      onChange={handleChange}
      allowClear={allowClear}
      size={size}
      className={`${isDebouncing ? 'debouncing' : ''} ${className}`}
      style={{
        borderRadius: '8px',
        border: '1px solid #d9d9d9',
        ...style
      }}
    />
  );
}; 