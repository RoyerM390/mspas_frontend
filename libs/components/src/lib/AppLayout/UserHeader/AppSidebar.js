import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AppVerticalMenu from "../components/AppVerticalNav";
import { useSidebarContext } from "@aqtiva/context/SidebarContextProvider";
import { StyledUserHeaderSidebar, StyledUserSidebarScrollbar } from "./index.styled";

const AppSidebar = ({isCollapsed, routesConfig}) => {
  const {isSidebarBgImage} = useSidebarContext();

  return (
    <StyledUserHeaderSidebar
      className={clsx({
        'userHeader-sidebar-img-background': isSidebarBgImage,
      })}
      collapsible
      breakpoint='xl'
      collapsed={isCollapsed}>
      <StyledUserSidebarScrollbar scrollToTop={false}>
        <AppVerticalMenu  routesConfig={routesConfig} />
      </StyledUserSidebarScrollbar>
    </StyledUserHeaderSidebar>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool,
};
