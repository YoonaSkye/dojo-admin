import { useCollapsed } from '@/store/userStore';
import { Outlet } from 'react-router-dom';

export default function Main() {
  const collapsed = useCollapsed();
  return (
    <div
      className={`w-full pt-[80px] ${
        collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-260px)]'
      }`}
    >
      Main
      <Outlet />
    </div>
  );
}
