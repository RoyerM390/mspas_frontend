import React from 'react';
import { useRouter } from 'next/router';
import IntlMessages from '@aqtiva/helpers/IntlMessages';
import AppAnimate from '@aqtiva/components/AppAnimate';
import AppPageMeta from '@aqtiva/components/AppPageMeta';
import { ReactComponent as Logo } from '../../../assets/icon/maintenance.svg';
import {
  StyledErrorButton,
  StyledErrorContainer,
  StyledErrorContent,
  StyledErrorImageLg,
  StyledErrorPara,
} from '../index.styled';

const Maintenance = () => {
  const router = useRouter();

  const onGoBackToHome = () => {
    router.back();
  };

  return (
    <>
      <AppPageMeta title="Maintenance" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledErrorContainer key="a">
          <StyledErrorImageLg>
            <Logo />
          </StyledErrorImageLg>
          <StyledErrorContent className="error-content-lg">
            <h3>
              <IntlMessages id="error.mantainanceMessage1" />
            </h3>
            <StyledErrorPara>
              <p className="mb-0">
                <IntlMessages id="error.mantainanceMessage2" />
              </p>
              <p className="mb-0">
                <IntlMessages id="error.mantainanceMessage3" />.
              </p>
            </StyledErrorPara>
            <StyledErrorButton type="primary" onClick={onGoBackToHome}>
              <IntlMessages id="error.takeMeToHome" />
            </StyledErrorButton>
          </StyledErrorContent>
        </StyledErrorContainer>
      </AppAnimate>
    </>
  );
};

export default Maintenance;
