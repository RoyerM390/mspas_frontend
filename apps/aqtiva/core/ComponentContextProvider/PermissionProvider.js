import PermissionContext from './PermissionContext';
import PropTypes from 'prop-types';
import { useAuthUser } from '@aqtiva/hooks/AuthHooks';

const PermissionProvider = ({ children }) => {
  const { user } = useAuthUser();
  const permissions = user?.roles ? [...user.roles] : null;

  const roleIsAllowedTo = (permission) => {
    if (permissions.includes('ADMINISTRADOR')) return true;
    let flag = false;
    if (Array.isArray(permission)) {
      for (const per of permission) {
        flag = permissions.includes(per);
        if (flag) break;
      }
      return flag;
    } else {
      return permissions.includes(permission);
    }
  };

  return (
    <PermissionContext.Provider value={{ roleIsAllowedTo }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;

PermissionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
