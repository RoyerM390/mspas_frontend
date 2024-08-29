import React from "react";
import collapseMotion from "antd/lib/_util/motion";
import clsx from "clsx";
import AppVerticalMenu from "../components/AppVerticalNav";
import { useSidebarContext } from "@aqtiva/context/SidebarContextProvider";
import { StyledAppScrollBarMini, StyledUserMiniSidebar } from "./index.styled";
import PropsTypes from "prop-types";

const AppSidebar = ({ routesConfig }) => {
  const { isSidebarBgImage } = useSidebarContext();

  return (
    <StyledUserMiniSidebar
      className={clsx({
        'userMiniHeader-sidebar-img-background': isSidebarBgImage,
      })}
      breakpoint="lg"
      collapsed={collapseMotion}
    >
      <StyledAppScrollBarMini scrollToTop={false}>
        <AppVerticalMenu routesConfig={routesConfig} />
      </StyledAppScrollBarMini>
    </StyledUserMiniSidebar>
  );
};

export default AppSidebar;
AppSidebar.propsTypes = {
  routesConfig: PropsTypes.array.isRequired,
};
