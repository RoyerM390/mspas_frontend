import React from 'react';

const defaultBehaviour = {
  roleIsAllowedTo: () => false,
};

const PermissionContext = React.createContext(defaultBehaviour);

export default PermissionContext;
