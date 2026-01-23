import { IconButton } from '@/components/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LANGUAGE_MAP, useLocale, type Locale } from '@/features/lang';
import { Languages } from '@/icons';

export default function LangSwitch() {
  const { locale, setLocale } = useLocale();

  const localeList = Object.values(LANGUAGE_MAP).map((item) => {
    return {
      key: item.locale,
      label: item.label,
    };
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton className="focus-visible:ring-0">
          <Languages className="size-4" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10}>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(val) => setLocale(val as Locale)}
        >
          {localeList.map((item) => (
            <DropdownMenuRadioItem key={item.key} value={item.key}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
