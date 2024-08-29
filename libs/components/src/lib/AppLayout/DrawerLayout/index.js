import React, { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppContentView from "@aqtiva/components/AppContentView";
import AppThemeSetting from "../../AppThemeSetting";
import AppFooter from "../components/AppFooter";
import clsx from "clsx";
import { FooterType } from "@aqtiva/constants/AppEnums";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import { StyledAppDrawerLayout, StyledAppDrawerLayoutMain, StyledDrawerScrollbar } from "./index.styled";
import PropsTypes from "prop-types";

const DrawerLayout = ({ children, routesConfig }) => {
  const [isVisible, setVisible] = useState(false);

  const { footer, footerType } = useLayoutContext();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <StyledAppDrawerLayout
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar visible={isVisible} onClose={onClose} routesConfig={routesConfig} />
      <StyledAppDrawerLayoutMain className="app-DrawerLayout-main">
        <AppHeader showDrawer={showDrawer} />
        <StyledDrawerScrollbar>
          <AppContentView >{children}</AppContentView>
          <AppFooter />
        </StyledDrawerScrollbar>
      </StyledAppDrawerLayoutMain>
      <AppThemeSetting />
    </StyledAppDrawerLayout>
  );
};

export default DrawerLayout;
DrawerLayout.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
