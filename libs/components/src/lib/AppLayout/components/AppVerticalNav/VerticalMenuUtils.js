import Link from 'next/link';
import React from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { IconList } from './icons';

const renderMenuItemChildren = (item) => {
  const { icon, titulo, path } = item;
  const IconOb = _.find(IconList, { nombre: icon });
  const Icon = IconOb ? <IconOb.Icon /> : null;
  if (path && path.includes('/'))
    return {
      key: item.path,
      icon:
        Icon &&
        (React.isValidElement(Icon) ? (
          <span className="ant-menu-item-icon">{Icon}</span>
        ) : (
          <icon className="ant-menu-item-icon" />
        )),
      label:
        item.type === 'collapse' ? (
          <Link href="#">
            <span data-testid={titulo.toLowerCase + '-nav'}>{titulo}</span>
          </Link>
        ) : (
          <Link href={path || '#'}>
            <span data-testid={titulo.toLowerCase + '-nav'}>{titulo}</span>
          </Link>
        ),
    };
  else {
    return {
      key: item.path,
      icon:
        Icon &&
        (React.isValidElement(Icon) ? (
          <span className="ant-menu-item-icon">{Icon}</span>
        ) : (
          <icon className="ant-menu-item-icon" />
        )),
      label: <span data-testid={item.titulo + '-nav'}>{item.titulo}</span>,
    };
  }
};

const renderMenuItem = (item) => {
  return item.type === 'collapse'
    ? {
        key: item.path,
        ...renderMenuItemChildren(item),
        children:
          item?.other_rutas && item?.other_rutas.length > 0
            ? item?.other_rutas?.map((item) => renderMenuItem(item))
            : [],
        //        type: 'collapse',
      }
    : {
        key: item.path,
        ...renderMenuItemChildren(item),
      };
};

const renderMenu = (item) => {
  return item.type === 'group'
    ? {
        key: item.path ? item.path : item.id,
        ...renderMenuItemChildren(item),
        children: item?.other_rutas?.map((item) => renderMenuItem(item)),
        type: 'group',
      }
    : {
        key: item.path,
        exact: item.exact,
        ...renderMenuItemChildren(item),
      };
};

export const getRouteMenus = (routesConfig) => {
  return routesConfig
    ?.filter((route) => route.type !== 'hidden')
    .map((route) => renderMenu(route));
};
