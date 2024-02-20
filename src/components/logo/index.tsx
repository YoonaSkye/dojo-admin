import { NavLink } from 'react-router-dom';

export default function Logo({ classname = '' }: { classname?: string }) {
  return (
    <NavLink to="/" className={`no-underline font-semibold ${classname}`}>
      Logo
    </NavLink>
  );
}
