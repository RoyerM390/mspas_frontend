import React from "react";
import { Menu } from "antd";
import PropTypes from "prop-types";
import { getRouteHorMenus } from "./HorizontalMenuUtils";
import { useRouter } from "next/router";

const AppHorizontalNav = ({ className, routesConfig }) => {
  const { pathname } = useRouter();

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[0];
  return (
    <Menu
      mode="horizontal"
      className={className}
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys.replaceAll('/', ':')]}
    >
      {getRouteHorMenus(routesConfig)}
    </Menu>
  );
};

export default AppHorizontalNav;
AppHorizontalNav.propTypes = {
  className: PropTypes.string,
  routesConfig: PropTypes.array.isRequired,
};
