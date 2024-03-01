import { IconButton, SvgIcon } from '@/components/icon';
import { useCollapsed } from '@/store/userStore';
import SearchBar from '../_common/search-bar';
import LocalPicker from '@/components/local-picker';

export default function Header() {
  const collapsed = useCollapsed();

  return (
    <header
      className={`z-20 shadow-sm fixed md:right-0 md:left-auto ${
        collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-260px)]'
      }`}
    >
      {/* //TODO: 这里要考虑不同view point大小下的布局 web版: mobile版: */}
      <div className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10">
        <div className="flex items-baseline">
          <IconButton className="h-10 w-10 md:hidden">
            <SvgIcon icon="ic-menu" size="24" />
          </IconButton>
          <div className="hidden md:block">breadcrumb</div>
        </div>

        <div className="flex">
          {/* searchBar */}
          <SearchBar />
          {/* localPicker */}
          <LocalPicker />
          {/* github icon */}

          {/* notice button */}

          {/* setting button */}

          {/* account button */}
        </div>
      </div>
    </header>
  );
}
