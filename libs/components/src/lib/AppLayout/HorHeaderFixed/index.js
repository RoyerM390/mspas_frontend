import React, { useEffect, useState } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppContentView from "@aqtiva/components/AppContentView";
import AppThemeSetting from "../../AppThemeSetting";
import AppFooter from "../components/AppFooter";
import clsx from "clsx";
import { FooterType, LayoutType } from "@aqtiva/constants/AppEnums";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import { StyledAppLayoutHeaderFixedMain, StyledAppLayoutHorFixed, StyledContainer } from "./index.styled";
import PropsTypes from "prop-types";

const HorHeaderFixed = ({ children, routesConfig }) => {
  const [isVisible, setVisible] = useState(false);
  const {footer, footerType, layoutType} = useLayoutContext();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (layoutType === LayoutType.FRAMED) {
      document.body.classList.add('framedHorHeaderFixedLayout');
    } else {
      document.body.classList.remove('framedHorHeaderFixedLayout');
    }
  }, [layoutType]);

  return (
    <StyledAppLayoutHorFixed
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}>
      <AppSidebar visible={isVisible} onClose={onClose} routesConfig={routesConfig} />
      <AppHeader showDrawer={showDrawer} routesConfig={routesConfig} />
      <StyledAppLayoutHeaderFixedMain>
        <StyledContainer>
          <AppContentView >{children}</AppContentView>
          <AppFooter />
        </StyledContainer>
      </StyledAppLayoutHeaderFixedMain>
      <AppThemeSetting />
    </StyledAppLayoutHorFixed>
  );
};

export default HorHeaderFixed;
HorHeaderFixed.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
