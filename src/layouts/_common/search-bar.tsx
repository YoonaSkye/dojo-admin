import { IconButton, SvgIcon } from '@/components/icon';
import { useFlattenedRoutes } from '@/router/hooks';
import { Empty, Input, InputRef, Modal, Tag } from 'antd';
import { useState, useRef, CSSProperties, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Scrollbar from '@/components/scrollbar';
import { useThemeToken } from '@/theme/hooks';
import Color from 'color';

export default function SearchBar() {
  const { t } = useTranslation();
  const flattenedRoutes = useFlattenedRoutes();
  const themeToken = useThemeToken();

  // ref
  const inputRef = useRef<InputRef>(null);
  // state
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(flattenedRoutes);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const activeStyle: CSSProperties = {
    border: `1px dashed ${themeToken.colorPrimary}`,
    backgroundColor: `${Color(themeToken.colorPrimary).alpha(0.2).toString()}`,
  };

  //刷选搜索结果
  useEffect(() => {
    const result = flattenedRoutes.filter(
      (item) =>
        t(item.label).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        t(item.key).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
    setSearchResult(result);
    setSelectedItemIndex(0);
  }, [searchQuery, flattenedRoutes, t]);

  const handleOpen = () => {
    setSearch(true);
  };

  const handleCancel = () => {
    setSearch(false);
  };

  const handleAfterOpenChange = (open: boolean) => {
    if (open) {
      // auto focus
      inputRef.current?.focus();
    }
  };

  const handleHover = (index: number) => {
    if (index === selectedItemIndex) return;
    setSelectedItemIndex(index);
  };

  const handleSelect = (key: string) => {
    //TODO: 完成所有页面后再实现
    // replace(key);
    // handleCancel();
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <IconButton className="h-10 w-10" onClick={handleOpen}>
          <SvgIcon icon="ic-search" size="20" />
        </IconButton>
        <IconButton className="h-6 rounded-md bg-hover text-xs font-bold">
          ⌘K
        </IconButton>
      </div>
      <Modal
        centered
        keyboard
        open={search}
        onCancel={handleCancel}
        closeIcon={false}
        afterOpenChange={handleAfterOpenChange}
        bodyStyle={{
          height: '400px',
        }}
        title={
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            prefix={<SvgIcon icon="ic-search" size="20" />}
            suffix={
              <IconButton className="h-6 rounded-md bg-hover text-xs">
                Esc
              </IconButton>
            }
          />
        }
        footer={
          <div className="flex flex-wrap">
            <div className="flex mr-1">
              <Tag color="cyan">↑</Tag>
              <Tag color="cyan">↓</Tag>
              <span>to navigate</span>
            </div>
            <div className="flex mr-1">
              <Tag color="cyan">↵</Tag>
              <span>to select</span>
            </div>
            <div className="flex">
              <Tag color="cyan">ESC</Tag>
              <span>to close</span>
            </div>
          </div>
        }
      >
        {searchResult.length === 0 ? (
          <Empty />
        ) : (
          <Scrollbar>
            <div className="py-2">
              {searchResult.map(({ key, label }, index) => {
                const partsTitle = parse(
                  t(label),
                  match(t(label), searchQuery)
                );
                const partsKey = parse(t(key), match(t(key), searchQuery));
                return (
                  <div
                    className="flex flex-col cursor-pointer w-full px-4 py-2 rounded-lg border-dashed border-b-indigo-500"
                    style={index === selectedItemIndex ? activeStyle : {}}
                    onClick={() => handleSelect(key)}
                    onMouseMove={() => handleHover(index)}
                  >
                    <div className="flex justify-between">
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
                    </div>
                  </div>
                );
              })}
            </div>
          </Scrollbar>
        )}
      </Modal>
    </>
  );
}
