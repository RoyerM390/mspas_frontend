import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useLayoutActionsContext} from "@aqtiva/context/LayoutContextProvider";
import {useSidebarActionsContext} from "@aqtiva/context/SidebarContextProvider";
import AuthWrapper from "./AuthWrapper";

const withLayout = (ComposedComponent) => (props) => {
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const router = useRouter();

  useEffect(() => {
    if (router.query.layout) updateNavStyle(router.query.layout);
    if (router.query.menuStyle) updateMenuStyle(router.query.menuStyle);
    if (router.query.sidebarImage) setSidebarBgImage(true);
  }, [
    router.query.layout,
    router.query.menuStyle,
    router.query.sidebarImage,
    setSidebarBgImage,
    updateMenuStyle,
    updateNavStyle,
  ]);
  return (
    <AuthWrapper>
      <ComposedComponent {...props} />
    </AuthWrapper>
  );
};

export default withLayout;
