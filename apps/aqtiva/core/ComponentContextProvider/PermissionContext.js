import React from 'react';

const defaultBehaviour = {
  roleIsAllowedTo: () => false,
};

// Create the context
const PermissionContext = React.createContext(defaultBehaviour);

export default PermissionContext;