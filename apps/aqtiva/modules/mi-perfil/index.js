import React from 'react';

import { HiUser } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai';
import IntlMessages from '@aqtiva/helpers/IntlMessages';
import {
  StyledUserProfileContainer,
  StyledUserProfileTabs,
} from './index.styled';
import AppAnimate from '@aqtiva/components/AppAnimate';
import {
  ChangePassword,
  PersonalInfo,
} from '@aqtiva/modules/UserProfile';

const items = [
  {
    label: (
      <span className="user-profile-icon">
        <HiUser className="icon" />
        <span>
          <IntlMessages id="userProfile.personalInfo" />
        </span>
      </span>
    ),
    key: '01',
    children: <PersonalInfo />,
  }, // remember to pass the key prop
  {
    label: (
      <span className="user-profile-icon">
        <AiFillLock className="icon" />
        <span>
          <IntlMessages id="userProfile.changePassword" />
        </span>
      </span>
    ),
    key: '02',
    children: <ChangePassword />,
  },
];

const UserProfile = () => {
  return (
    <StyledUserProfileContainer>
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledUserProfileTabs
          key="1"
          defaultActiveKey="01"
          tabPosition="left"
          items={items}
        />
      </AppAnimate>
    </StyledUserProfileContainer>
  );
};

export default UserProfile;
