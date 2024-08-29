import React from "react";
import PropTypes from "prop-types";
import { useAuthUser } from "@aqtiva/hooks/AuthHooks";
import AppLoader from "./AppLoader";

const AuthRoutes = ({ children }) => {
  const { isLoading } = useAuthUser();
  return isLoading ? <AppLoader /> : <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
