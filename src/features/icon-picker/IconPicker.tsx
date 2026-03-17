import { listIcons } from '@iconify/react';
import { Input, Pagination, Space } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Iconify } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { fetchIconsData } from './icons';

import type { ReactNode } from 'react';

interface Props {
  pageSize?: number;
  /** 图标集的名字 */
  prefix?: string;
  /** 是否自动请求API以获得图标集的数据.提供prefix时有效 */
  autoFetchApi?: boolean;
  /**
   * 图标列表
   */
  icons?: string[];
  /** Input组件 */
  inputComponent?: ReactNode;
  /** 图标插槽名，预览图标将被渲染到此插槽中 */
  iconSlot?: string;
  /** input组件的值属性名称 */
  modelValueProp?: string;
  /** 图标样式 */
  iconClass?: string;
  type?: 'icon' | 'input';
  value?: string;
  onChange?: (value: string) => void;
  /** 自定义类名 */
  className?: string;
}

const DEFAULT_PAGE_SIZE = 36;

function IconPicker({
  prefix = 'ant-design',
  pageSize = DEFAULT_PAGE_SIZE,
  icons = [],
  iconSlot = 'addonAfter',
  iconClass = 'size-4',
  autoFetchApi = true,
  modelValueProp = 'value',
  inputComponent,
  type = 'input',
  value: propValue,
  onChange,
  className,
  ...restProps
}: Props) {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [currentSelect, setCurrentSelect] = useState('');
  const [keyword, setKeyword] = useState('');
  const [innerIcons, setInnerIcons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 同步外部传入的值
  useEffect(() => {
    if (propValue !== undefined) {
      setCurrentSelect(propValue);
    }
  }, [propValue]);

  // 获取图标数据
  useEffect(() => {
    if (prefix && prefix !== 'svg' && autoFetchApi) {
      fetchIconsData(prefix).then((data) => {
        setInnerIcons(data);
      });
    }
  }, [prefix, autoFetchApi]);

  const currentList = useMemo(() => {
    try {
      if (prefix) {
        if (prefix !== 'svg' && autoFetchApi && icons.length === 0) {
          return innerIcons;
        }
        const svgIcons = listIcons('', prefix);
        if (icons.length === 0) {
          console.warn(`No icons found for prefix: ${prefix}`);
        }
        return svgIcons;
      } else {
        return icons;
      }
    } catch (error) {
      console.error('Failed to load icons:', error);
      return [];
    }
  }, [prefix, autoFetchApi, icons, innerIcons]);

  const showList = useMemo(() => {
    if (!keyword) return currentList;
    return currentList.filter((item) => item.includes(keyword.toLowerCase()));
  }, [currentList, keyword]);

  // 分页数据
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return showList.slice(start, start + pageSize);
  }, [showList, currentPage, pageSize]);

  const total = showList.length;

  const handleClick = (icon: string) => {
    setCurrentSelect(icon);
    if (onChange) {
      onChange(icon);
    }
    setVisible(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setCurrentPage(1);
  };

  function toggleOpenState() {
    setVisible(!visible);
  }

  function open() {
    setVisible(true);
  }

  function close() {
    setVisible(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentSelect(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // 搜索输入框属性
  const searchInputProps = useMemo(
    () => ({
      placeholder: t('ui.iconPicker.search'),
      value: keyword,
      onChange: handleKeywordChange,
      className: 'mx-2',
    }),
    [keyword, t],
  );

  // 默认图标（当没有选中图标时显示）
  const defaultIcon = 'mdi:help-circle-outline';

  const popoverContent = (
    <div className="w-full">
      <div className="mb-2 flex w-full">
        {inputComponent ? (
          // 这里用户可以自定义输入组件，传入时优先使用
          // React.cloneElement()
          <Input {...searchInputProps} />
        ) : (
          <Input
            placeholder={t('ui.iconPicker.search')}
            value={keyword}
            onChange={handleKeywordChange}
            className="mx-2 h-8 w-full"
          />
        )}
      </div>

      {paginatedList.length > 0 ? (
        <>
          <div className="grid max-h-[360px] w-full grid-cols-6 justify-items-center overflow-y-auto">
            {paginatedList.map((item, index) => (
              <Button
                key={`${item}-${index}`}
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${currentSelect === item ? 'text-primary' : ''}`}
                onClick={() => handleClick(item)}
                title={item}
              >
                <Iconify
                  icon={item}
                  className={currentSelect === item ? 'transition-all' : ''}
                  width={20}
                  height={20}
                />
              </Button>
            ))}
          </div>
          {total > pageSize && (
            <div className="flex justify-end border-t py-2 pr-3">
              <Pagination
                size="small"
                current={currentPage}
                pageSize={pageSize}
                total={total}
                showSizeChanger={false}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-[150px] w-full flex-col items-center justify-center text-muted-foreground">
          <Iconify icon="mdi:folder-open-outline" className="size-10" />
          <div className="mt-1 text-sm">{t('common.noData')}</div>
        </div>
      )}
    </div>
  );

  return (
    <Popover open={visible} onOpenChange={setVisible}>
      <PopoverTrigger asChild>
        {type === 'input' ? (
          inputComponent && iconSlot === 'addonAfter' ? (
            <div className={cn('cursor-pointer', className)}>
              <Space.Compact>
                {typeof inputComponent === 'object' && 'props' in inputComponent
                  ? // - 处理 React 元素
                    React.cloneElement(inputComponent, {
                      [modelValueProp]: currentSelect,
                      placeholder: t('ui.iconPicker.placeholder'),
                      role: 'combobox',
                      'aria-label': t('ui.iconPicker.placeholder'),
                      'aria-expanded': visible,
                      onChange: handleInputChange,
                      ...restProps,
                    })
                  : inputComponent}
                <Space.Addon>
                  <Iconify
                    icon={currentSelect || defaultIcon}
                    width={16}
                    height={16}
                  />
                </Space.Addon>
              </Space.Compact>
            </div>
          ) : (
            <div className={cn('relative w-full cursor-pointer', className)}>
              <Input
                value={currentSelect}
                placeholder={t('ui.iconPicker.placeholder')}
                className="h-8 w-full pr-8"
                role="combobox"
                aria-label={t('ui.iconPicker.placeholder')}
                aria-expanded={visible}
                onChange={handleInputChange}
                {...restProps}
              />
              <Iconify
                icon={currentSelect || defaultIcon}
                className="absolute right-1 top-1/2 size-6 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>
          )
        ) : (
          <div className="cursor-pointer">
            <Iconify icon={currentSelect || defaultIcon} {...restProps} />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 pt-3" align="end" sideOffset={8}>
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
}

export { IconPicker };
export default IconPicker;
