import { useLanguage } from '@/context/Language';

import enTranslations from '@/i18n/en.json';
import viTranslations from '@/i18n/vi.json';

const translations = {
    en: enTranslations,
    vi: viTranslations
} as const;

export function useTranslation() {
    const { language } = useLanguage();

    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = translations[language as keyof typeof translations];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return { t, language };
}