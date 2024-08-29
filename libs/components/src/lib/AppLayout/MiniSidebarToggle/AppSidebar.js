import React from "react";
import PropTypes from "prop-types";
import UserInfo from "../components/UserInfo";
import clsx from "clsx";
import AppVerticalMenu from "../components/AppVerticalNav";
import { useSidebarContext } from "@aqtiva/context/SidebarContextProvider";
import { StyledMiniSidebarScrollbar, StyledMiniSidebarToggle } from "./index.styled";

const AppSidebar = ({isCollapsed, routesConfig}) => {
  const {isSidebarBgImage} = useSidebarContext();

  return (
    <StyledMiniSidebarToggle
      className={clsx({
        'mini-sidebar-toggle-img-background': isSidebarBgImage,
      })}
      collapsible
      breakpoint='xl'
      collapsedWidth='0'
      collapsed={isCollapsed}>
      <UserInfo hasColor />
      <StyledMiniSidebarScrollbar scrollToTop={false}>
        <AppVerticalMenu  routesConfig={routesConfig} />
      </StyledMiniSidebarScrollbar>
    </StyledMiniSidebarToggle>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool,
};
