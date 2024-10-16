import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { useThemeContext } from '@aqtiva/context/ThemeContextProvider';
import { useAuthMethod, useAuthUser } from '@aqtiva/hooks/AuthHooks';
import { useSidebarContext } from '@aqtiva/context/SidebarContextProvider';
import PropTypes from 'prop-types';
import {
  StyledCrUserDesignation,
  StyledCrUserInfo,
  StyledCrUserInfoAvatar,
  StyledCrUserInfoContent,
  StyledCrUserInfoInner,
  StyledUserArrow,
  StyledUsername,
  StyledUsernameInfo,
} from './index.styled';

const UserInfo = ({ hasColor }) => {
  const { themeMode } = useThemeContext();
  const { logout } = useAuthMethod();
  const { user } = useAuthUser();
  const router = useRouter();
  const { sidebarColorSet } = useSidebarContext();
  const { isSidebarBgImage } = useSidebarContext();

  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  const items = [
    {
      key: 1,
      label: <div onClick={() => router.push('/mi-perfil')}>Mi perfil</div>,
    },
    {
      key: 2,
      label: <div>Salir</div>,
      onClick: () => {
        logout();
        // console.log('click aqui');
        // localStorage.removeItem('token');
        // // router.push('/');
        // window.location.reload();
      },
    },
  ];

  return (
    <>
      {hasColor ? (
        <StyledCrUserInfo
          style={{
            backgroundColor: isSidebarBgImage
              ? ''
              : sidebarColorSet.sidebarHeaderColor,
            color: sidebarColorSet.sidebarTextColor,
          }}
          className={clsx('cr-user-info', {
            light: themeMode === 'light',
          })}
        >
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}
          >
            <StyledCrUserInfoInner className="ant-dropdown-link">
              {user.photoURL ? (
                <StyledCrUserInfoAvatar src={user.photoURL} />
              ) : (
                <StyledCrUserInfoAvatar>
                  {getUserAvatar()}
                </StyledCrUserInfoAvatar>
              )}
              <StyledCrUserInfoContent className="cr-user-info-content">
                <StyledUsernameInfo>
                  <StyledUsername
                    className={clsx('text-truncate', {
                      light: themeMode === 'light',
                    })}
                  >
                    {user.nickname ? user.nickname : 'admin user '}
                  </StyledUsername>
                  <StyledUserArrow className="cr-user-arrow">
                    <FaChevronDown />
                  </StyledUserArrow>
                </StyledUsernameInfo>
                <StyledCrUserDesignation className="text-truncate">
                  {user.rol.nombre}
                </StyledCrUserDesignation>
              </StyledCrUserInfoContent>
            </StyledCrUserInfoInner>
          </Dropdown>
        </StyledCrUserInfo>
      ) : (
        <StyledCrUserInfo
          className={clsx('cr-user-info', {
            light: themeMode === 'light',
          })}
        >
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}
          >
            <StyledCrUserInfoInner className="ant-dropdown-link">
              {user.photoURL ? (
                <StyledCrUserInfoAvatar src={user.photoURL} />
              ) : (
                <StyledCrUserInfoAvatar>
                  {getUserAvatar()}
                </StyledCrUserInfoAvatar>
              )}
              <StyledCrUserInfoContent className="cr-user-info-content">
                <StyledUsernameInfo>
                  <StyledUsername
                    className={clsx('text-truncate', {
                      light: themeMode === 'light',
                    })}
                  >
                    {user.nickname ? user.nickname : 'admin user '}
                  </StyledUsername>
                  <StyledUserArrow className="cr-user-arrow">
                    <FaChevronDown />
                  </StyledUserArrow>
                </StyledUsernameInfo>
                <StyledCrUserDesignation className="text-truncate cr-user-designation">
                  System Manager
                </StyledCrUserDesignation>
              </StyledCrUserInfoContent>
            </StyledCrUserInfoInner>
          </Dropdown>
        </StyledCrUserInfo>
      )}
    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  hasColor: PropTypes.bool,
};
