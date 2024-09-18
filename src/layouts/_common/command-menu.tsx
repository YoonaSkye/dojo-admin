import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { ArrowUp, ArrowDown, CornerDownLeft, MdiKeyboardEsc } from '@/icons';
import { useTranslation } from 'react-i18next';
import { useFlattenedRoutes } from '@/router/hooks';
import { useThemeToken } from '@/theme/hooks';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';

// TODO
/**
 * 报错 使用shadcn command组件
 * `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users.
 */

export default function CommandMenu({ ...props }: DialogProps) {
  const flattenedRoutes = useFlattenedRoutes();

  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(flattenedRoutes);
  const [searchQuery, setSearchQuery] = useState('');

  const themeToken = useThemeToken();
  const { t } = useTranslation();
  const navigete = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  //刷选搜索结果
  // useEffect(() => {
  //   const result = flattenedRoutes.filter(
  //     (item) =>
  //       t(item.label).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
  //       t(item.key).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
  //   );
  //   setSearchResult(result);
  // }, [searchQuery, flattenedRoutes, t]);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {searchResult.map(({ key, label }) => {
              const partsTitle = parse(t(label), match(t(label), searchQuery));
              const partsKey = parse(key, match(key, searchQuery));
              return (
                <CommandItem
                  key={key}
                  value={t(label)}
                  keywords={[key]}
                  onSelect={() => {
                    runCommand(() => navigete(key as string));
                  }}
                >
                  <div className="">
                    <div className="font-medium">
                      {partsTitle.map((item) => (
                        <span
                          key={item.text}
                          style={{
                            color: item.highlight
                              ? themeToken.colorPrimary
                              : themeToken.colorText,
                          }}
                        >
                          {item.text}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs">
                      {partsKey.map((item) => (
                        <span
                          key={item.text}
                          style={{
                            color: item.highlight
                              ? themeToken.colorPrimary
                              : themeToken.colorTextDescription,
                          }}
                        >
                          {item.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
        <CommandSeparator />
        <CommandMenuFooter />
      </CommandDialog>
    </>
  );
}

function CommandMenuFooter() {
  return (
    <div className="flex sm:flex-row sm:justify-end sm:gap-x-2 flex-row items-center justify-end border-t p-2">
      <div className="flex w-full justify-start text-xs text-muted-foreground">
        <div className="mr-2 flex items-center">
          <CornerDownLeft className="mr-1 size-3" />
          选择
        </div>
        <div className="mr-2 flex items-center">
          <ArrowUp className="mr-1 size-3" />
          <ArrowDown className="mr-1 size-3" /> 导航
        </div>
        <div className="flex items-center">
          <MdiKeyboardEsc /> 关闭
        </div>
      </div>
    </div>
  );
}
