import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useAuthUser } from "@aqtiva/hooks/AuthHooks";
import AppLoader from "@aqtiva/components/AppLoader";
import { initialUrl } from "@aqtiva/constants/AppConst";
import PropTypes from "prop-types";

const withData = (ComposedComponent) => {
  return (props) => {
    const { user, isLoading } = useAuthUser();
    const { asPath } = useRouter();
    const queryParams = asPath.split("?")[1];
    useEffect(() => {
      if (user) {
        Router.push(initialUrl + (queryParams ? "?" + queryParams : ""));
      }
    }, [queryParams, user]);
    if (isLoading) return <AppLoader />;
    if (user) return <AppLoader />;

    return <ComposedComponent {...props} />;
  };
};

export default withData;

withData.propTypes = {
  ComposedComponent: PropTypes.elementType.isRequired,
}
