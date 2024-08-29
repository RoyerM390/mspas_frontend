import React from "react";
import AppPage from "../core/DefaultPage";
import asyncComponent from "@aqtiva/components/AppAsyncComponent";

const SignIn = asyncComponent(() => import('../modules/auth/Signin'));
export default AppPage(() => <SignIn />);
