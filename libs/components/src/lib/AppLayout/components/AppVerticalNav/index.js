import React, { useEffect, useState } from 'react';
import { getRouteMenus } from './VerticalMenuUtils';
import clsx from 'clsx';
import defaultConfig from '@aqtiva/constants/defaultConfig';
import { useSidebarContext } from '@aqtiva/context/SidebarContextProvider';
import { MenuStyle } from '@aqtiva/constants/AppEnums';
import { StyledVerticalNav } from './index.styled';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const AppVerticalNav = ({ routesConfig }) => {
  const { menuStyle, sidebarColorSet } = useSidebarContext();
  const { pathname } = useRouter();
  const selectedKeys = pathname.substring(1).split('/');
  selectedKeys.pop();
  const selectedKeysC = pathname.substring(1).split('/');
  const [openKeys, setOpenKeys] = useState(['/' + selectedKeys.join('/')]);
  const [defaultSelectedKeys] = useState(selectedKeys);

  useEffect(() => {
    setOpenKeys(['/' + selectedKeys.join('/'), '/' + selectedKeysC.join('/')]);
  }, []);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <StyledVerticalNav
      theme={sidebarColorSet.mode}
      color={sidebarColorSet.sidebarMenuSelectedTextColor}
      bgcolor={sidebarColorSet.sidebarMenuSelectedBgColor}
      mode="inline"
      className={clsx({
        'menu-rounded': menuStyle === MenuStyle.ROUNDED,
        'menu-rounded rounded-menu-reverse':
          menuStyle === MenuStyle.ROUNDED_REVERSE,
        'menu-rounded standard-menu': menuStyle === MenuStyle.STANDARD,
        'menu-rounded curved-menu': menuStyle === MenuStyle.CURVED_MENU,
        'bg-color-menu':
          sidebarColorSet.sidebarBgColor !==
          defaultConfig.sidebar.colorSet.sidebarBgColor,
      })}
      openKeys={openKeys}
      selectedKeys={openKeys}
      onOpenChange={onOpenChange}
      defaultSelectedKeys={[defaultSelectedKeys]}
      items={getRouteMenus(routesConfig)}
    />
  );
};

export default AppVerticalNav;
AppVerticalNav.propTypes = {
  routesConfig: PropTypes.array.isRequired,
};
