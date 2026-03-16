import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT = `--vben-content-height`;

export interface PageProps {
  title?: string;
  description?: string;
  contentClass?: string;
  /** 根据content可见高度自适应 */
  autoContentHeight?: boolean;
  headerClass?: string;
  footerClass?: string;
  /** Custom height offset value (in pixels) to adjust content area sizing
   * when used with autoContentHeight
   * @default 0 */
  heightOffset?: number;
  children?: ReactNode;
  /** Custom title slot */
  titleNode?: ReactNode;
  /** Custom description slot */
  descriptionNode?: ReactNode;
  /** Extra actions slot */
  extra?: ReactNode;
  /** Footer slot */
  footer?: ReactNode;
}

function Page({
  autoContentHeight = false,
  heightOffset = 0,
  title,
  description,
  contentClass,
  headerClass,
  footerClass,
  children,
  titleNode,
  descriptionNode,
  extra,
  footer: footerNode,
}: PageProps) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [shouldAutoHeight, setShouldAutoHeight] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const calcContentHeight = useCallback(async () => {
    if (!autoContentHeight) {
      return;
    }
    // Use requestAnimationFrame instead of nextTick for React
    await new Promise((resolve) => requestAnimationFrame(resolve));

    setHeaderHeight(headerRef.current?.offsetHeight || 0);
    setFooterHeight(footerRef.current?.offsetHeight || 0);

    setTimeout(() => {
      setShouldAutoHeight(true);
    }, 30);
  }, [autoContentHeight]);

  useEffect(() => {
    calcContentHeight();
  }, [calcContentHeight]);

  const contentStyle: CSSProperties = autoContentHeight
    ? {
        height: `calc(var(${CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT}) - ${headerHeight}px - ${footerHeight}px - ${typeof heightOffset === 'number' ? `${heightOffset}px` : heightOffset})`,
        overflowY: shouldAutoHeight ? 'auto' : 'unset',
      }
    : {};

  const showHeader = !!(
    description ||
    descriptionNode ||
    title ||
    titleNode ||
    extra
  );

  return (
    <div className="relative flex min-h-full flex-col">
      {showHeader && (
        <div
          ref={headerRef}
          className={cn(
            'bg-card border-border relative flex items-end border-b px-6 py-4',
            headerClass,
          )}
        >
          <div className="flex-auto">
            {titleNode ? (
              titleNode
            ) : (
              <>
                {title && (
                  <div className="mb-2 flex text-lg font-semibold">{title}</div>
                )}
              </>
            )}

            {descriptionNode ? (
              descriptionNode
            ) : (
              <>
                {description && (
                  <p className="text-muted-foreground">{description}</p>
                )}
              </>
            )}
          </div>

          {extra && <div>{extra}</div>}
        </div>
      )}

      <div className={cn('h-full p-4', contentClass)} style={contentStyle}>
        {children}
      </div>

      {footerNode && (
        <div
          ref={footerRef}
          className={cn('bg-card align-center flex px-6 py-4', footerClass)}
        >
          {footerNode}
        </div>
      )}
    </div>
  );
}

export default Page;
