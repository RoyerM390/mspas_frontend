import React from 'react';
import PropTypes from 'prop-types';
import AppCard from '@aqtiva/components/AppCard';
import AppImage from '@aqtiva/components/AppImage';
import {
  StyledInicioCardHeader,
  StyledCremaLogo,
  StyledCremaPara,
  StyledCremaTitle,
  StyledCremaUserInfoContent,
  StyledSocialLink,
  StyledUserInfo,
} from './index.styled';

const InicioCard = (props) => {
  const { data, bgColor, icon } = props;

  return (
    <AppCard style={{ backgroundColor: bgColor }}>
      <StyledInicioCardHeader>
        <StyledUserInfo>
          {/*<StyledCremaLogo>*/}
          {/*  <AppImage alt='logo' src={data.icon} />*/}
          {/*</StyledCremaLogo>*/}
          <StyledCremaUserInfoContent>
            <StyledCremaTitle className="text-truncate text-uppercase">
              {data.titulo}
            </StyledCremaTitle>
            {/*<p className='text-truncate'>{data.id}</p>*/}
          </StyledCremaUserInfoContent>
        </StyledUserInfo>
        <StyledSocialLink>{icon}</StyledSocialLink>
      </StyledInicioCardHeader>

      {/*<StyledCremaPara>{data.descripcion}</StyledCremaPara>*/}
    </AppCard>
  );
};

export default InicioCard;

InicioCard.defaultProps = {
  bgColor: '',
};

InicioCard.propTypes = {
  data: PropTypes.object.isRequired,
  bgColor: PropTypes.string,
  icon: PropTypes.any,
};
