import React, { useEffect, useState } from "react";
import { Grid } from "antd";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppContentView from "@aqtiva/components/AppContentView";
import AppThemeSetting from "../../AppThemeSetting";
import AppFooter from "../components/AppFooter";
import clsx from "clsx";
import { FooterType } from "@aqtiva/constants/AppEnums";
import { isEmpty } from "@aqtiva/helpers";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import {
  StyledAppLayoutUserHeader,
  StyledAppLayoutUserHeaderMain,
  StyledUserHeaderMainScrollbar
} from "./index.styled";
import PropsTypes from "prop-types";
import { useRouter } from "next/router";

const {useBreakpoint} = Grid;

const UserHeader = ({ children, routesConfig }) => {
  const width = useBreakpoint();
  const { pathname } = useRouter();
  const [isCollapsed, setCollapsed] = useState(false);
  const {footer, footerType} = useLayoutContext();

  useEffect(() => {
    if (isCollapsed) setCollapsed(!isCollapsed);
  }, [pathname]);

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!isEmpty(width)) {
      if (width.xl) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
  }, [width]);

  return (
    <StyledAppLayoutUserHeader
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}>
      <AppSidebar isCollapsed={isCollapsed} routesConfig={routesConfig} />
      <StyledAppLayoutUserHeaderMain className='app-layout-userHeader-main'>
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <StyledUserHeaderMainScrollbar>
          <AppContentView >{children}</AppContentView>
          <AppFooter />
        </StyledUserHeaderMainScrollbar>
      </StyledAppLayoutUserHeaderMain>
      <AppThemeSetting />
    </StyledAppLayoutUserHeader>
  );
};

export default UserHeader;
UserHeader.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
