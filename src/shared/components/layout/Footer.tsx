import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            © 2025 RA Ticketing System. {t('FOOTER.ALL_RIGHTS_RESERVED')}
          </div>
          <div className="text-sm text-gray-500">
            {t('FOOTER.VERSION')} 1.0.0
          </div>
        </div>
      </div>
    </footer>
  );
}; 