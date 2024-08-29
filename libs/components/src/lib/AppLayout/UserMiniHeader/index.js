import React from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppContentView from "@aqtiva/components/AppContentView";
import AppThemeSetting from "../../AppThemeSetting";
import clsx from "clsx";
import { FooterType, LayoutType } from "@aqtiva/constants/AppEnums";
import AppFooter from "../components/AppFooter";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import { StyledAppLayoutMinibar, StyledAppLayoutMinibarMain, StyledUserMiniHeaderScrollbar } from "./index.styled";
import PropsTypes from "prop-types";

const UserMiniHeader = ({ children, routesConfig }) => {
  const { footer, layoutType, footerType } = useLayoutContext();

  return (
    <StyledAppLayoutMinibar
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
        boxedLayout: layoutType === LayoutType.BOXED,
      })}
    >
      <AppSidebar routesConfig={routesConfig} />
      <StyledAppLayoutMinibarMain className="app-layout-userMiniHeader-main">
        <AppHeader />
        <StyledUserMiniHeaderScrollbar>
          <AppContentView >{children}</AppContentView>
          <AppFooter />
        </StyledUserMiniHeaderScrollbar>
      </StyledAppLayoutMinibarMain>
      <AppThemeSetting />
    </StyledAppLayoutMinibar>
  );
};

export default UserMiniHeader;
UserMiniHeader.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
