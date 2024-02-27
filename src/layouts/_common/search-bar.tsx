import { IconButton, SvgIcon } from '@/components/icon';
import { useFlattenedRoutes } from '@/router/hooks';
import { Empty, Input, InputRef, Modal, Tag } from 'antd';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Scrollbar from '@/components/scrollbar';

export default function SearchBar() {
  const { t } = useTranslation();
  const flattenedRoutes = useFlattenedRoutes();

  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(flattenedRoutes);
  const inputRef = useRef<InputRef>(null);

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

  return (
    <>
      <div className="flex items-center justify-center">
        <IconButton className="h-10 w-10" onClick={handleOpen}>
          <SvgIcon icon="ic-search" size="20" />
        </IconButton>
        <IconButton className="h-6 rounded-md bg-[#63738114] text-xs font-bold">
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
                  <div className="flex flex-col cursor-pointer w-full px-4 py-2 rounded-lg border-dashed border-b-indigo-500">
                    <div className="flex justify-between">
                      <div className="">
                        <div className="font-medium">
                          {partsTitle.map((item) => (
                            <span key={item.text}>{item.text}</span>
                          ))}
                        </div>
                        <div className="text-xs">
                          {partsKey.map((item) => (
                            <span key={item.text}>{item.text}</span>
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
