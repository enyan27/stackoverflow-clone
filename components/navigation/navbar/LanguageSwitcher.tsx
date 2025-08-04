'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/Language';

const i18n = {
    en: {
        en: 'English',
        vi: 'Tiếng Việt'
    },
    vi: {
        en: 'English',
        vi: 'Tiếng Việt'
    }
};

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const t = i18n[language as keyof typeof i18n];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Globe className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Globe className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                    {t.en}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('vi')}>
                    {t.vi}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 