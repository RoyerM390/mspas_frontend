import React, {useEffect} from "react";
import { Layouts } from "@aqtiva/components";
import {useLayoutActionsContext, useLayoutContext} from "@aqtiva/context/LayoutContextProvider";
import { useSidebarActionsContext } from '@aqtiva/context/SidebarContextProvider';
import {useRouter} from "next/router";
import { useAuthUser } from "@aqtiva/hooks/AuthHooks";

const withLayout = (ComposedComponent) => (props) => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];
  const {user} = useAuthUser();

  const {updateNavStyle} = useLayoutActionsContext();
  const {updateMenuStyle, setSidebarBgImage} = useSidebarActionsContext();
  const router = useRouter()

  useEffect(() => {
    if (router.query.layout) updateNavStyle(router.query.layout);
    if (router.query.menuStyle) updateMenuStyle(router.query.menuStyle);
    if (router.query.sidebarImage) setSidebarBgImage(true);
  }, []);

  return (
//    <AppLayout routesConfig={routesConfig}>
     <AppLayout routesConfig={user?.routes}>
      <ComposedComponent {...props} />
    </AppLayout>
  );
};

export default withLayout;
