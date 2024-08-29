import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import PermissionContext from './PermissionContext';

// This component is meant to be used everywhere a restriction based on user permission is needed
const Restricted = ({to, children}) => {
  const {roleIsAllowedTo} = useContext(PermissionContext);

  // If the user has that permission, render the children
  if (roleIsAllowedTo(to)) {
    return <>{children}</>;
  }

  // Otherwise, do not render anything
  return null;
};

export default Restricted;

Restricted.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};