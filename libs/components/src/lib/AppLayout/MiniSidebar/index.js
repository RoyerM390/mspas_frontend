import React from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppContentView from "@aqtiva/components/AppContentView";
import AppThemeSetting from "../../AppThemeSetting";
import clsx from "clsx";
import { FooterType, LayoutType } from "@aqtiva/constants/AppEnums";
import AppFooter from "../components/AppFooter";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import { StyledAppLayoutMini, StyledAppLayoutMiniMain, StyledMainMiniScrollbar } from "./index.styled";
import PropsTypes from "prop-types";

const MiniSidebar = ({ children, routesConfig }) => {
  const {footer, layoutType, footerType} = useLayoutContext();

  return (
    <StyledAppLayoutMini
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
        boxedLayout: layoutType === LayoutType.BOXED,
      })}>
      <AppSidebar routesConfig={routesConfig} />
      <StyledAppLayoutMiniMain className='app-layout-mini-main'>
        <AppHeader />
        <StyledMainMiniScrollbar>
          <AppContentView >{children}</AppContentView>
          <AppFooter />
        </StyledMainMiniScrollbar>
      </StyledAppLayoutMiniMain>
      <AppThemeSetting />
    </StyledAppLayoutMini>
  );
};

export default MiniSidebar;
MiniSidebar.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
