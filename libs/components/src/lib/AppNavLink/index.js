import React from "react";
import NavLink from "next/link";

const AppNavLink = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

export default AppNavLink;
