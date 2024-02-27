import { IconButton, SvgIcon } from '@/components/icon';
import { Input, InputRef, Modal, Tag } from 'antd';
import { useState, useRef } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
