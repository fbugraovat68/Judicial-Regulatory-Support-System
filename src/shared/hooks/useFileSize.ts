import { useMemo } from 'react';
import { formatFileSize } from '../utils/filesize';

export const useFileSize = (bytes: number | null | undefined, decimals: number = 1) => {
  return useMemo(() => formatFileSize(bytes, decimals), [bytes, decimals]);
}; 