import { IconButton } from '@/components/icon';
import { Divider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserActions, useUserInfo } from '@/store/userStore';
import { useRouter } from '@/router/hooks';
import { useThemeToken } from '@/theme/hooks';
import React from 'react';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function AccountDropdown() {
  const { t } = useTranslation();
  const { username, email, avatar } = useUserInfo();
  const { clearUserInfoAndToken } = useUserActions();
  const { replace } = useRouter();
  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } =
    useThemeToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  const logout = () => {
    try {
      clearUserInfoAndToken();
    } catch (error) {
      console.log(error);
    } finally {
      replace('/login');
    }
  };

  const dropdownRender = (menus: React.ReactNode) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{username}</div>
        <div className="text-gray">{email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menus as React.ReactElement, { style: menuStyle })}
    </div>
  );

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
      onClick: logout,
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      dropdownRender={dropdownRender}
    >
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <img src={avatar} alt="" className="h-8 w-8 rounded-full" />
      </IconButton>
    </Dropdown>
  );
}
