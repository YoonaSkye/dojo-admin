import { useCollapsed } from '@/store/userStore';

export default function Header() {
  const collapsed = useCollapsed();

  return (
    <header
      className={`bg-green-300 z-20 shadow-sm fixed md:right-0 md:left-auto ${
        collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-260px)]'
      }`}
    >
      Header
    </header>
  );
}
