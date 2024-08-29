import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PropsTypes from "prop-types";
import { useRouter } from "next/router";
import UserInfo from "../components/UserInfo";
import clsx from "clsx";
import AppVerticalMenu from "../components/AppVerticalNav";
import { LayoutDirection } from "@aqtiva/constants/AppEnums";
import { useSidebarContext } from "@aqtiva/context/SidebarContextProvider";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import { StyledAppHorDrawer, StyledAppSidebarHorScrollbar, StyledHorMainSidebar } from "./index.styled";

const AppSidebar = ({visible, onClose, routesConfig}) => {
  const {isSidebarBgImage} = useSidebarContext();
  const {direction} = useLayoutContext();
  const { pathname } = useRouter();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <StyledAppHorDrawer
      placement={direction === LayoutDirection.LTR ? 'left' : 'right'}
      closable={false}
      onClose={onClose}
      open={visible}>
      <StyledHorMainSidebar
        className={clsx({
          'hor-sidebar-img-background': isSidebarBgImage,
        })}
        collapsible>
        <UserInfo />
        <StyledAppSidebarHorScrollbar scrollToTop={false}>
          <AppVerticalMenu  routesConfig={routesConfig} />
        </StyledAppSidebarHorScrollbar>
      </StyledHorMainSidebar>
    </StyledAppHorDrawer>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  visible: PropTypes.bool,
  routesConfig: PropsTypes.array.isRequired,
  onClose: PropTypes.func,
};
