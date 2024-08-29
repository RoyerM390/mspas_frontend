import {useContext} from 'react';
import PermissionContext from './PermissionContext';

const usePermission = (permission) => {
  const {roleIsAllowedTo} = useContext(PermissionContext);
  return roleIsAllowedTo(permission);
};

export default usePermission;