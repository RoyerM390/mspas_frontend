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
import { StyledAppHorDarkDrawer, StyledAppMainHorDarkSidebar, StyledAppScrollbar } from "./index.styled";

const AppSidebar = ({visible, onClose, routesConfig}) => {
  const {isSidebarBgImage} = useSidebarContext();
  const {direction} = useLayoutContext();
  const { pathname } = useRouter();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <StyledAppHorDarkDrawer
      placement={direction === LayoutDirection.LTR ? 'left' : 'right'}
      closable={false}
      onClose={onClose}
      open={visible}>
      <StyledAppMainHorDarkSidebar
        className={clsx({
          'hor-dark-sidebar-img-background': isSidebarBgImage,
        })}
        collapsible>
        <UserInfo />
        <StyledAppScrollbar scrollToTop={false}>
          <AppVerticalMenu  routesConfig={routesConfig} />
        </StyledAppScrollbar>
      </StyledAppMainHorDarkSidebar>
    </StyledAppHorDarkDrawer>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  routesConfig: PropsTypes.array.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
