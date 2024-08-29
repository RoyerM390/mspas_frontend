import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PropsTypes from "prop-types";
import UserInfo from "../components/UserInfo";
import clsx from "clsx";
import AppVerticalMenu from "../components/AppVerticalNav";
import { useRouter } from "next/router";
import { LayoutDirection } from "@aqtiva/constants/AppEnums";
import { useSidebarContext } from "@aqtiva/context/SidebarContextProvider";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import { StyledAppDrawer, StyledAppDrawerLayoutSidebar, StyledAppDrawerSidebarScrollbar } from "./index.styled";

const AppSidebar = ({visible, onClose}) => {
  const {isSidebarBgImage} = useSidebarContext();
  const {direction} = useLayoutContext();
  const { pathname } = useRouter();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <StyledAppDrawer
      placement={direction === LayoutDirection.LTR ? 'left' : 'right'}
      closable={false}
      onClose={onClose}
      open={visible}>
      <StyledAppDrawerLayoutSidebar
        className={clsx({
          'drawerLayout-sidebar-img-background': isSidebarBgImage,
        })}
        collapsible>
        <UserInfo hasColor />
        <StyledAppDrawerSidebarScrollbar scrollToTop={false}>
          <AppVerticalMenu />
        </StyledAppDrawerSidebarScrollbar>
      </StyledAppDrawerLayoutSidebar>
    </StyledAppDrawer>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  routesConfig: PropsTypes.array.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
