import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledAuth,
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap,
  StyledMainAuthScrollbar,
} from './AuthWrapper.styled';
import AppLogo from '@aqtiva/components/AppLogo';
import AppAnimateGroup from '@aqtiva/components/AppAnimateGroup';
import AppImage from '@aqtiva/components/AppImage';
// import AppInfoView from '@aqtiva/components/AppInfoView';

const AuthWrapper = ({ children }) => {
  return (
    <StyledAuth>
      <StyledMainAuthScrollbar>
        <AppAnimateGroup
          type="scale"
          animateStyle={{ flex: 1 }}
          style={{ flex: 1 }}
          delay={0}
          interval={10}
          duration={200}
        >
          <StyledAuthWrap key={'wrap'}>
            <StyledAuthCard>
              <StyledAuthMainContent>
                <StyledAuthCardHeader>
                  <AppLogo />
                </StyledAuthCardHeader>
                {children}
              </StyledAuthMainContent>
              {/*<StyledAuthWellAction>*/}
              {/*  <StyledAuthWelContent>*/}
              {/*    <AppImage src="/assets/images/mspas.webp" alt="crema-logo" />*/}
              {/*    /!*<p>Te echamos la mano</p>*!/*/}
              {/*  </StyledAuthWelContent>*/}
              {/*</StyledAuthWellAction>*/}
            </StyledAuthCard>
          </StyledAuthWrap>
          {/*<AppInfoView />*/}
        </AppAnimateGroup>
      </StyledMainAuthScrollbar>
    </StyledAuth>
  );
};
export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
