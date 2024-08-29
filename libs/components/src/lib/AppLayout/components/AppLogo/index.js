import React from 'react';
import PropTypes from 'prop-types';
import { useSidebarContext } from '@aqtiva/context/SidebarContextProvider';
import { StyledAppLogo } from './index.styled';
import AppImage from '../../../AppImage';

const AppLogo = ({ hasSidebarColor }) => {
  const { sidebarColorSet } = useSidebarContext();
  return (
    <StyledAppLogo>
      {hasSidebarColor && sidebarColorSet.mode === 'dark' ? (
        <AppImage
          src="/assets/images/logo-white-with-name.png"
          alt="crema-logo"
        />
      ) : (
        <AppImage src="/assets/images/logo-with-name.webp" alt="crema-logo" />
      )}
    </StyledAppLogo>
  );
};

export default AppLogo;

AppLogo.propTypes = {
  hasSidebarColor: PropTypes.bool,
};
