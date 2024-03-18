import { useThemeToken } from '@/theme/hooks';
import { NavLink } from 'react-router-dom';

export default function Logo({ className = '' }: { className?: string }) {
  const { colorPrimary } = useThemeToken();
  return (
    <NavLink to="/" className="no-underline">
      <button
        className={`font-semibold ${className}`}
        style={{ color: colorPrimary }}
      >
        Logo
      </button>
    </NavLink>
  );
}
