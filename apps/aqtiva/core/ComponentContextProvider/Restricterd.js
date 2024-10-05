import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PermissionContext from './PermissionContext';

const Restricted = ({ to, children }) => {
  const { roleIsAllowedTo } = useContext(PermissionContext);

  if (roleIsAllowedTo(to)) {
    return <>{children}</>;
  }
  return null;
};

export default Restricted;

Restricted.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};
