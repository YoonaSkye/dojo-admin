import { IconButton } from '@/components/icon';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function AccountDropdown() {
  const { t } = useTranslation();
  const items: MenuProps['items'] = [
    {
      label: <NavLink to={HOMEPAGE}>{t('sys.menu.dashboard')}</NavLink>,
      key: '0',
    },
    {
      label: (
        <NavLink to="/management/user/profile">
          {t('sys.menu.user.profile')}
        </NavLink>
      ),
      key: '1',
    },
    {
      label: (
        <NavLink to="/management/user/account">
          {t('sys.menu.user.account')}
        </NavLink>
      ),
      key: '2',
    },
    { type: 'divider' },
    {
      label: (
        <button className="font-bold text-warning">
          {t('sys.login.logout')}
        </button>
      ),
      key: '3',
      // onClick: logout,
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <img src="" alt="" className="h-8 w-8 rounded-full" />
      </IconButton>
    </Dropdown>
  );
}
