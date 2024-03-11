import { useThemeToken } from '@/theme/hooks';
import { NavLink } from 'react-router-dom';

export default function Logo({ classname = '' }: { classname?: string }) {
  const { colorPrimary } = useThemeToken();
  return (
    <NavLink
      to="/"
      className={`no-underline font-semibold ${classname}`}
      style={{ color: colorPrimary }}
    >
      Dojo
    </NavLink>
  );
}
