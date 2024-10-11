import { Iconify } from '@/components/icon';
import { X } from '@/icons';
import { KeepAliveTab } from './multi-tabs-provider';
import './label.scss';

interface Props {
  children: React.ReactNode;
  closeTab: (path?: string) => void;
  tab?: KeepAliveTab;
  closable: boolean;
}

export default function Label({ children, closeTab, tab, closable }: Props) {
  return (
    <div className="relative size-full h-[34px] px-1">
      {/* background */}
      <div className="tabs-chrome__background absolute z-[-1] size-full px-[calc(var(--gap)-1px)] py-0 transition-opacity duration-150">
        <div className="tabs-chrome__background-content group-[.is-active]:bg-primary/15 dark:group-[.is-active]:bg-accent h-full rounded-tl-[var(--gap)] rounded-tr-[var(--gap)] duration-150"></div>
        <svg
          className="tabs-chrome__background-before group-[.is-active]:fill-primary/15 dark:group-[.is-active]:fill-accent absolute bottom-0 left-[-1px] fill-transparent transition-all duration-150"
          height="7"
          width="7"
        >
          <path data-v-c5fe917d="" d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z"></path>
        </svg>
        <svg
          className="tabs-chrome__background-after group-[.is-active]:fill-primary/15 dark:group-[.is-active]:fill-accent absolute bottom-0 right-[-1px] fill-transparent transition-all duration-150"
          height="7"
          width="7"
        >
          <path data-v-c5fe917d="" d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z"></path>
        </svg>
      </div>
      {/* extra */}
      <div className="tabs-chrome__extra absolute right-[var(--gap)] top-1/2 z-[3] size-4 translate-y-[-50%]">
        {closable && (
          <X
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab?.pathname);
            }}
            className="hover:bg-accent stroke-accent-foreground/80 hover:stroke-accent-foreground text-accent-foreground/80 group-[.is-active]:text-accent-foreground mt-[2px] size-3 cursor-pointer rounded-full transition-all"
          />
        )}
      </div>
      {/* main */}
      <div className="tabs-chrome__item-main group-[.is-active]:text-primary dark:group-[.is-active]:text-accent-foreground text-accent-foreground z-[2] mx-[calc(var(--gap)*2)] my-0 flex h-full items-center overflow-hidden rounded-tl-[5px] rounded-tr-[5px] pl-2 pr-4 duration-150">
        <Iconify
          icon={tab?.icon}
          className="mr-1 flex size-4 items-center overflow-hidden"
        />
        <span className="flex-1 overflow-hidden whitespace-nowrap text-sm">
          {children}
        </span>
      </div>
    </div>
  );
}
