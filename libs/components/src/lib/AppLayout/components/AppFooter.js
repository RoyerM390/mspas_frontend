import React from "react";
import { useLayoutContext } from "@aqtiva/context/LayoutContextProvider";
import { StyledFooterBtn, StyledFooterBtnView, StyledMainFooter } from "./AppFooter.styled";

const AppFooter = () => {
  const {footer} = useLayoutContext();

  if (footer) {
    return (
      <StyledMainFooter>
        <p>Sistema MSPAS</p>
        {/*<StyledFooterBtnView>*/}
        {/*  <StyledFooterBtn type='link' color='primary'>*/}
        {/*    Buy Now*/}
        {/*  </StyledFooterBtn>*/}
        {/*</StyledFooterBtnView>*/}
      </StyledMainFooter>
    );
  }
  return null;
};

export default AppFooter;
