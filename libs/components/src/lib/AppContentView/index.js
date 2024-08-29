import React from "react";
import AppErrorBoundary from "../AppErrorBoundary";
import { StyledMainContentView } from "./index.styled";
import AppSuspense from "@aqtiva/components/AppSuspense";
import PropTypes from "prop-types";

const AppContentView = ({ children }) => {
  return (
    <StyledMainContentView>
      <AppSuspense>
        <AppErrorBoundary>{children}</AppErrorBoundary>
      </AppSuspense>
    </StyledMainContentView>
  );
};

export default AppContentView;

AppContentView.propTypes = {
  children: PropTypes.object.isRequired,
};
