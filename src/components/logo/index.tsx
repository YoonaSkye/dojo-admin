import AppLogo from '@/assets/images/logo.png';
import { Link } from 'react-router-dom';
import IAvatar from '../avatar';

export default function Logo() {
  return (
    <div className="light flex h-full items-center text-lg">
      <Link
        to="/"
        className="flex h-full items-center gap-2 overflow-hidden px-3 text-lg leading-normal transition-all duration-500"
      >
        <IAvatar
          src={AppLogo}
          alt="vben admin Antd"
          className="relative w-8 rounded-none bg-transparent"
        />
        {/* TODO: 是否考虑添加collapsed判断逻辑 */}
        <span className="text-foreground truncate text-nowrap font-semibold">
          Dojo Admin Antd
        </span>
      </Link>
    </div>
  );
}
