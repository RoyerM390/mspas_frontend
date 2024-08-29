import React from "react";
import { Layout } from "antd";
import { ThemeMode } from "@aqtiva/constants/AppEnums";
import { useThemeContext } from "@aqtiva/context/ThemeContextProvider";
import { useSidebarContext } from "@aqtiva/context/SidebarContextProvider";
import PropTypes from "prop-types";

const {Sider} = Layout;

const MainSidebar = ({children, className, collapsed = false, ...props}) => {
  const {themeMode} = useThemeContext();
  const {sidebarColorSet, isSidebarBgImage, sidebarBgImage} =
    useSidebarContext();

  return (
    <Sider
      theme={themeMode === ThemeMode.LIGHT ? ThemeMode.LIGHT : ThemeMode.DARK}
      breakpoint='lg'
      className={className}
      style={{
        backgroundColor: sidebarColorSet.sidebarBgColor,
        color: sidebarColorSet.sidebarTextColor,
        backgroundImage: isSidebarBgImage
          ? `url(/assets/images/sidebar/images/${sidebarBgImage}.png)`
          : '',
      }}
      collapsed={collapsed}
      {...props}>
      {children}
    </Sider>
  );
};

export default MainSidebar;
MainSidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  collapsed: PropTypes.bool,
};
