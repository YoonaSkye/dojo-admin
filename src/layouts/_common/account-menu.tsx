import avatar from '@/assets/images/avatar-v1.webp';
import IAvatar from '@/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useRouter } from '@/router/hooks';
import { useAccessActions, useAccessStore } from '@/store/access';
import { useUserInfo, useUserStore } from '@/store/user';

import { BookOpenTextIcon, LogOutIcon } from 'lucide-react';
import { AiFillGithub } from 'react-icons/ai';
import { Modal } from 'antd';
import { useState } from 'react';

const accountMenuItems: {
  label: string;
  key: number;
  icon: React.ReactNode;
  link: string;
}[] = [
  {
    label: '文档',
    key: 0,
    icon: <BookOpenTextIcon className="mr-2 size-4" />,
    link: '/',
  },
  {
    label: 'Github',
    key: 1,
    icon: <AiFillGithub className="mr-2 size-4" />,
    link: '/',
  },
];

export default function AccountMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userInfo = useUserInfo();
  const { setAccessToken, setRefreshToken } = useAccessActions();
  const { replace } = useRouter();

  const logout = () => {
    try {
      setAccessToken(null);
      setRefreshToken(null);
      useAccessStore.persist.clearStorage();
      useUserStore.persist.clearStorage();
    } catch (error) {
      console.log(error);
    } finally {
      replace('/auth/login');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    logout();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="hover:bg-accent ml-1 mr-2 cursor-pointer rounded-full p-1.5">
            <div className="hover:text-accent-foreground flex-center">
              <IAvatar src={avatar} alt="vben" className="size-8" dot />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 min-w-[240px] p-0 pb-1">
          <DropdownMenuLabel className="flex items-center p-3">
            <IAvatar
              src={avatar}
              alt="vben"
              className="size-12"
              dot
              dotClass="bottom-0 right-1 border-2 size-4 bg-green-500"
            />
            <div className="ml-2 w-full">
              <div className="text-foreground mb-1 flex items-center text-sm font-medium">
                {userInfo?.realName}
                {/* TODO 抽离Bage组件 */}
                {/* <Badge class="ml-2 text-green-400">{{ tagText }}</Badge>
                 */}
                <div
                  className={cn(
                    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent hover:bg-accent shadow ml-2 text-green-400',
                    'ml-2 text-green-400'
                  )}
                >
                  Pro
                </div>
              </div>
              <div className="text-muted-foreground text-xs font-normal">
                ann.dojo@gmail.com
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {accountMenuItems.map(({ label, key, icon, link }) => {
            return (
              <DropdownMenuItem
                className="mx-1 leading-8"
                key={key}
                onClick={() => replace(link)}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={showModal}>
            <LogOutIcon className="mr-2 size-4" />
            退出登录
            <DropdownMenuShortcut>⌥ Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        title="提示"
        centered
        okText="确认"
        cancelText="取消"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        是否退出登录？
      </Modal>
    </>
  );
}
