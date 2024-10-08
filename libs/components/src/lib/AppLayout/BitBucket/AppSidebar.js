import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserInfo from "../components/UserInfo";
import clsx from "clsx";
import BucketMinibar from "./BucketMinibar";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import AppVerticalMenu from "../components/AppVerticalNav";
import { useRouter } from "next/router";
import { LayoutDirection } from "@aqtiva/constants/AppEnums";
import { useSidebarContext } from "@aqtiva/context/SidebarContextProvider";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import {
  StyledAppBitbucketDrawer,
  StyledAppBitbucketScrollbar,
  StyledAppBitbucketSidebar,
  StyledAppBitbucketSidebarWrapper,
  StyledBitbucketBtn
} from "./index.styled";

const AppSidebar = ({visible, onClose,routesConfig}) => {
  const {isSidebarBgImage} = useSidebarContext();
  const {direction} = useLayoutContext();
  const { pathname } = useRouter();

  useEffect(() => {
    onClose();
  }, [pathname]);

  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const onSidebarClosed = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const sideBarComponent = () => {
    return (
      <StyledAppBitbucketSidebar
        className={clsx('app-BitBucket-sidebar', {
          'bitBucket-sidebar-img-background': isSidebarBgImage,
        })}
        collapsible>
        <UserInfo hasColor />
        <StyledAppBitbucketScrollbar scrollToTop={false}>
          <AppVerticalMenu routesConfig={routesConfig}/>
        </StyledAppBitbucketScrollbar>
      </StyledAppBitbucketSidebar>
    );
  };

  return (
    <>
      <StyledAppBitbucketDrawer
        placement={direction === LayoutDirection.LTR ? 'left' : 'right'}
        closable={false}
        onClose={onClose}
        open={visible}>
        <StyledAppBitbucketSidebarWrapper className='app-BitBucket-sidebar-wrapper'>
          <BucketMinibar />
          {sideBarComponent()}
        </StyledAppBitbucketSidebarWrapper>
      </StyledAppBitbucketDrawer>
      <StyledAppBitbucketSidebarWrapper
        className={clsx('app-BitBucket-sidebar-wrapper', {
          'app-BitBucket-sidebar-wrapper-close': isSidebarClosed,
        })}>
        <BucketMinibar />
        {sideBarComponent()}
        <StyledBitbucketBtn onClick={onSidebarClosed}>
          {isSidebarClosed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </StyledBitbucketBtn>
      </StyledAppBitbucketSidebarWrapper>
    </>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  routesConfig: PropTypes.array,
};
