import { Iconify } from '@/components/icon';
import { Pin, X } from '@/icons';
import { TabConfig } from '@/types';
import { forwardRef } from 'react';
import './label.scss';

interface Props {
  activeTab: string;
  closable: boolean;
  tab: TabConfig;
  tabIndex: number;
  title: string;
  closeTab: (key: string) => void;
}

/** 对于Shacn 具有asChild属性的组件，例如ContextMenu，自定义的子组件要使用forwardRef进行包裹，以确保ref能够正确传递到子组件上，同时要把props透传下去
 * https://www.radix-ui.com/primitives/docs/guides/composition
 */
const Label = forwardRef<HTMLDivElement, Props>(
  (
    { activeTab, closable, closeTab, tab, tabIndex, title, ...props },
    forwardedRef
  ) => {
    return (
      <div className="relative size-full px-1" {...props} ref={forwardedRef}>
        {/* divider */}
        {tabIndex !== 0 && tab.key !== activeTab && (
          <div className="tabs-chrome__divider bg-border absolute left-[var(--gap)] top-1/2 z-0 h-4 w-[1px] translate-y-[-50%] transition-all" />
        )}
        {/* background */}
        <div className="tabs-chrome__background absolute size-full px-[calc(var(--gap)-1px)] py-0 transition-opacity duration-150">
          <div className="tabs-chrome__background-content group-[.is-active]:bg-primary/15 dark:group-[.is-active]:bg-accent h-full rounded-tl-[var(--gap)] rounded-tr-[var(--gap)] duration-150" />
          <svg
            className="tabs-chrome__background-before group-[.is-active]:fill-primary/15 dark:group-[.is-active]:fill-accent absolute bottom-0 left-[-1px] fill-transparent transition-all duration-150"
            height="7"
            width="7"
          >
            <path d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z"></path>
          </svg>
          <svg
            className="tabs-chrome__background-after group-[.is-active]:fill-primary/15 dark:group-[.is-active]:fill-accent absolute bottom-0 right-[-1px] fill-transparent transition-all duration-150"
            height="7"
            width="7"
          >
            <path d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z"></path>
          </svg>
        </div>
        {/* extra */}
        <div className="tabs-chrome__extra absolute right-[var(--gap)] top-1/2 z-[3] size-4 translate-y-[-50%]">
          {closable && !tab.handle.affixTab && (
            <X
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.key!);
              }}
              className="hover:bg-accent stroke-accent-foreground/80 hover:stroke-accent-foreground text-accent-foreground/80 group-[.is-active]:text-accent-foreground mt-[2px] size-3 cursor-pointer rounded-full transition-all"
            />
          )}
          {closable && tab.handle.affixTab && (
            <Pin className="hover:text-accent-foreground text-accent-foreground/80 group-[.is-active]:text-accent-foreground mt-[1px] size-3.5 cursor-pointer rounded-full transition-all" />
          )}
        </div>
        {/* main */}
        <div className="tabs-chrome__item-main relative group-[.is-active]:text-primary dark:group-[.is-active]:text-accent-foreground text-accent-foreground z-[2] mx-[calc(var(--gap)*2)] my-0 flex h-full items-center overflow-hidden rounded-tl-[5px] rounded-tr-[5px] pl-2 pr-4 duration-150">
          {tab?.icon && (
            <Iconify
              icon={tab?.icon}
              className="mr-1 flex size-4 items-center overflow-hidden"
            />
          )}
          <span className="flex-1 overflow-hidden whitespace-nowrap text-sm">
            {title}
          </span>
        </div>
      </div>
    );
  }
);

export default Label;
