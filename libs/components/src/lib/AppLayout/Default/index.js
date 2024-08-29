import React, { useEffect, useState } from 'react';
import { Grid } from 'antd';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import AppContentView from '@aqtiva/components/AppContentView';
import AppThemeSetting from '../../AppThemeSetting';
import AppFooter from '../components/AppFooter';
import clsx from 'clsx';
import { FooterType } from '@aqtiva/constants/AppEnums';
import { isEmpty } from '@aqtiva/helpers';
import { useLayoutContext } from '@aqtiva/context/LayoutContextProvider';
import {
  StyledAppLayout,
  StyledAppLayoutMain,
  StyledMainScrollbar,
} from './index.styled';
import PropsTypes from 'prop-types';
import { useRouter } from 'next/router';

const { useBreakpoint } = Grid;

const Default = ({ routesConfig, children }) => {
  const width = useBreakpoint();
  const { pathname } = useRouter();
  const [isCollapsed, setCollapsed] = useState(false);
  const { footer, footerType } = useLayoutContext();

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (isCollapsed) setCollapsed(!isCollapsed);
  }, [pathname]);

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
    <StyledAppLayout
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar isCollapsed={isCollapsed} routesConfig={routesConfig} />
      <StyledAppLayoutMain className="app-layout-main">
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <StyledMainScrollbar>
          <AppContentView>{children}</AppContentView>
          <AppFooter />
        </StyledMainScrollbar>
      </StyledAppLayoutMain>
      {/*<AppThemeSetting />*/}
    </StyledAppLayout>
  );
};

export default Default;
Default.propTypes = {
  routesConfig: PropsTypes.array.isRequired,
  children: PropsTypes.node.isRequired,
};
