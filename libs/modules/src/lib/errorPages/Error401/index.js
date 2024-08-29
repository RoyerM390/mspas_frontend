import React from 'react';
import { useRouter } from 'next/router';
import IntlMessages from '@aqtiva/helpers/IntlMessages';
import AppAnimate from '@aqtiva/components/AppAnimate';
import AppPageMeta from '@aqtiva/components/AppPageMeta';
import { ReactComponent as Logo } from '../../../assets/icon/401.svg';
import {
  StyledErrorButton,
  StyledErrorContainer,
  StyledErrorContent,
  StyledErrorImage,
  StyledErrorPara,
} from '../index.styled';

const Error401 = () => {
  const router = useRouter();

  const onGoBackToHome = () => {
    router.back();
  };

  return (
    <>
      <AppPageMeta title="Unauthorized" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledErrorContainer key="a">
          <StyledErrorImage>
            <Logo />
          </StyledErrorImage>
          <StyledErrorContent>
            <h3>Unauthorized</h3>
            <StyledErrorPara>
              <p className="mb-0">You are not authorized for this page!</p>
            </StyledErrorPara>
            <StyledErrorButton type="primary" onClick={onGoBackToHome}>
              <IntlMessages id="error.goBackToHome" />
            </StyledErrorButton>
          </StyledErrorContent>
        </StyledErrorContainer>
      </AppAnimate>
    </>
  );
};

export default Error401;
