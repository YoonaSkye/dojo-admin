import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import useLocale, { LANGUAGE_MAP } from '@/locales/useLocale';

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const [language, setLanguage] = useState(locale);

  const localeList = Object.values(LANGUAGE_MAP).map((item) => {
    return {
      key: item.locale,
      label: item.label,
    };
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full outline-none flex items-center gap-1"
        >
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10}>
        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
          {localeList.map((item) => (
            <DropdownMenuRadioItem
              key={item.key}
              value={item.key}
              onClick={() => setLocale(item.key)}
            >
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
