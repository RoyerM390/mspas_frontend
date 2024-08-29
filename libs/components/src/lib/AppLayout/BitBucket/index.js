import React, { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppContentView from "@aqtiva/components/AppContentView";
import AppThemeSetting from "../../AppThemeSetting";
import AppFooter from "../components/AppFooter";
import clsx from "clsx";
import { FooterType } from "@aqtiva/constants/AppEnums";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import { StyledAppBitbucketLayout, StyledAppBitbucketLayoutMain, StyledBitbucketMainScrollbar } from "./index.styled";
import PropsTypes from "prop-types";

const BitBucket = ({ children, routesConfig }) => {
  const [isVisible, setVisible] = useState(false);
  const { footer, footerType } = useLayoutContext();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <StyledAppBitbucketLayout
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar
        visible={isVisible}
        onClose={onClose}
        routesConfig={routesConfig}
      />
      <StyledAppBitbucketLayoutMain>
        <AppHeader showDrawer={showDrawer} />
        <StyledBitbucketMainScrollbar>
          <AppContentView >{children}</AppContentView>
          <AppFooter />
        </StyledBitbucketMainScrollbar>
      </StyledAppBitbucketLayoutMain>
      <AppThemeSetting />
    </StyledAppBitbucketLayout>
  );
};

export default BitBucket;
BitBucket.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
