import { forwardRef } from 'react';
import { useCollapsed } from '@/store/userStore';
import { Outlet } from 'react-router-dom';

type Props = {
  offsetTop?: boolean;
};

const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
  const collapsed = useCollapsed();
  return (
    <div
      ref={ref}
      className={`w-full h-full overflow-auto pt-[80px] ${
        collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-260px)]'
      }`}
    >
      <Outlet />
    </div>
  );
});

export default Main;
