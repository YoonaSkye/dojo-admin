import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import avatar from '@/assets/images/avatar-v1.webp';
import { cn } from '@/lib/utils';
import { useRouter } from '@/router/hooks';
import { useUserActions } from '@/store/userStore';
import { BookOpenTextIcon, LogOutIcon } from 'lucide-react';
import { AiFillGithub } from 'react-icons/ai';

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
  const { clearUserInfoAndToken } = useUserActions();
  const { replace } = useRouter();

  const logout = () => {
    try {
      clearUserInfoAndToken();
    } catch (error) {
      console.log(error);
    } finally {
      replace('/login');
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="hover:bg-accent ml-1 mr-2 cursor-pointer rounded-full p-1.5">
          <div className="hover:text-accent-foreground flex-center">
            <div className="size-8 relative flex flex-shrink-0 items-center">
              <Avatar>
                <AvatarImage src={avatar} alt="vben" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* 暂时写死，应该动态决定 */}
              <span className="bg-green-500 border-background absolute bottom-0 right-0 size-3 rounded-full border-2"></span>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 min-w-[240px] p-0 pb-1">
        <DropdownMenuLabel className="flex items-center p-3">
          <div className="size-12 relative flex flex-shrink-0 items-center">
            <Avatar>
              <AvatarImage src={avatar} alt="vben" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* 暂时写死，应该动态决定 */}
            <span className="bg-green-500 border-background absolute bottom-0 right-0 size-3 rounded-full border-2"></span>
          </div>
          <div className="ml-2 w-full">
            <div className="text-foreground mb-1 flex items-center text-sm font-medium">
              Vben
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
              ann.vben@gmail.com
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
        <DropdownMenuItem onClick={logout}>
          <LogOutIcon className="mr-2 size-4" />
          退出登录
          <DropdownMenuShortcut>⌥ Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
