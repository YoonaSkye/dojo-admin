import { useThemeToken } from '@/theme/hooks';
import AppLogo from '@/assets/images/logo.png';
import { useCollapsed } from '@/store/setting';

export default function Logo({ className = '' }: { className?: string }) {
  const { colorPrimary } = useThemeToken();
  const collapsed = useCollapsed();
  return (
    <div className="h-12 py-[10px] pr-[10px] flex items-center pl-[7px] cursor-pointer">
      <img src={AppLogo} alt="logo" className="h-[32px] w-[32px]" />
      {!collapsed && (
        <div className="ml-2 text-white text-base leading-normal font-bold truncate md:opacity-100">
          Dojo admin
        </div>
      )}
    </div>
  );
}
