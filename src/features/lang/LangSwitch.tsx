import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from '@/icons';
import { useLocale, LANGUAGE_MAP, type Locale } from '@/features/lang';

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
        <Button
          variant="icon"
          size="icon"
          className="rounded-full flex items-center gap-1 focus-visible:ring-0"
        >
          <Languages className="size-4" />
        </Button>
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
