import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useRTL = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const currentLang = i18n.language;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    return i18n.language === 'ar' ? 'rtl' : 'ltr';
};
