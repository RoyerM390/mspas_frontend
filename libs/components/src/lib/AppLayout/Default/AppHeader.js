import React from 'react';
import { useIntl } from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import PropTypes from 'prop-types';
import { FiMoreVertical } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import {
  StyledAppHeader,
  StyledAppHeaderSectionMobile,
} from './index.styled';
import { Dropdown, Typography  } from 'antd';
import { StyledDropdownWrapper } from '../index.styled';
import {useAuthUser} from '@aqtiva/hooks/AuthHooks';
const { Title } = Typography;
const items = [
  // {key: 1, label: <AppMessages />},
  // {key: 2, label: <AppNotifications />},
  { key: 3, label: <AppLanguageSwitcher /> },
];

const AppHeader = ({ isCollapsed, onToggleSidebar }) => {
  const { messages } = useIntl();
  const {user} = useAuthUser();
  return (
    <StyledAppHeader>
      <a className="trigger" onClick={() => onToggleSidebar(!isCollapsed)}>
        <AiOutlineMenu />
      </a>
      <Title level={4}>{user.nickname}</Title>
      {/*<AppLogo />*/}
      {/*<StyledHeaderSearch placeholder={messages['common.searchHere']} />{' '}*/}
      {/*<StyledAppHeaderSectionDesk>*/}
      {/*  <AppLanguageSwitcher />*/}
      {/*<AppMessages />*/}
      {/*<AppNotifications />*/}
      {/*</StyledAppHeaderSectionDesk>*/}
      <StyledAppHeaderSectionMobile>
        <StyledDropdownWrapper>
          <Dropdown
            menu={{ items }}
            overlayClassName="dropdown-wrapper"
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={['click']}
          >
            <a
              className="ant-dropdown-link-mobile"
              onClick={(e) => e.preventDefault()}
            >
              <FiMoreVertical />
            </a>
          </Dropdown>
        </StyledDropdownWrapper>
      </StyledAppHeaderSectionMobile>
      {/*<StyledAppHeader>
      <a className='trigger' onClick={() => onToggleSidebar(!isCollapsed)}>
        <AiOutlineMenu />
      </a>
      <AppLogo />
      <StyledHeaderSearch placeholder={messages['common.searchHere']} />
      <StyledAppHeaderSectionDesk>
        <AppLanguageSwitcher />
        <AppMessages />
        <AppNotifications />
      </StyledAppHeaderSectionDesk>
      <StyledAppHeaderSectionMobile>
        <StyledDropdownWrapper>
          <Dropdown
            menu={{items}}
            overlayClassName='dropdown-wrapper'
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={['click']}>
            <a
              className='ant-dropdown-link-mobile'
              onClick={(e) => e.preventDefault()}>
              <FiMoreVertical />
            </a>
          </Dropdown>
        </StyledDropdownWrapper>
      </StyledAppHeaderSectionMobile>
    </StyledAppHeader>*/}
    </StyledAppHeader>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  onToggleSidebar: PropTypes.func,
  isCollapsed: PropTypes.bool,
};
