import React from 'react';
import {
  useSidebarActionsContext,
  useSidebarContext,
} from '@aqtiva/context/SidebarContextProvider';
import NavMenuStyle from './NavMenuStyle';
import IntlMessages from '@aqtiva/helpers/IntlMessages';
import { CheckOutlined } from '@ant-design/icons';
import { StyledSidebarSettings } from './index.styled';
import {
  StyledCustomizedItem,
  StyledCustomizedSwitch,
  StyledCustomizedSwitchView,
  StyledCustomizeNavOption,
  StyledCustomizeNavOptionContent,
  StyledCustomizeNavOptionItem,
  StyledCustomizeNavOptionRightIcon,
} from '../index.styled';
import AppImage from '../../AppImage';

const SidebarSettings = () => {
  const { sidebarBgImage, isSidebarBgImage } = useSidebarContext();

  const { updateSidebarBgImage, setSidebarBgImage } =
    useSidebarActionsContext();

  const onToggleSidebarImage = () => {
    setSidebarBgImage(!isSidebarBgImage);
  };
  const onUpdateSidebarBgImage = (image) => {
    updateSidebarBgImage(image);
  };

  return (
    <StyledSidebarSettings>
      <NavMenuStyle />
      <StyledCustomizedItem>
        <StyledCustomizedSwitchView>
          <h4>
            <IntlMessages id="customizer.sidebarImage" />
          </h4>
          <StyledCustomizedSwitch
            checked={isSidebarBgImage}
            onChange={onToggleSidebarImage}
            value="checkedA"
          />
        </StyledCustomizedSwitchView>

        {isSidebarBgImage ? (
          <StyledCustomizeNavOption style={{ marginTop: 20 }}>
            {/*{sidebarBgImages.map((imagesObj) => {*/}
            {/*  return (*/}
            {/*    <StyledCustomizeNavOptionItem key={imagesObj.id}>*/}
            {/*      <StyledCustomizeNavOptionContent*/}
            {/*        onClick={() => onUpdateSidebarBgImage(imagesObj.id)}>*/}
            {/*        <AppImage src={imagesObj.image} alt='nav' />*/}
            {/*        {sidebarBgImage === imagesObj.id ? (*/}
            {/*          <StyledCustomizeNavOptionRightIcon>*/}
            {/*            <CheckOutlined />*/}
            {/*          </StyledCustomizeNavOptionRightIcon>*/}
            {/*        ) : null}*/}
            {/*      </StyledCustomizeNavOptionContent>*/}
            {/*    </StyledCustomizeNavOptionItem>*/}
            {/*  );*/}
            {/*})}*/}
          </StyledCustomizeNavOption>
        ) : null}
      </StyledCustomizedItem>
    </StyledSidebarSettings>
  );
};

export default SidebarSettings;
