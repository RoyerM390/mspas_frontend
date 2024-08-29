import PermissionContext from './PermissionContext';
import PropTypes from 'prop-types';
import { useAuthUser } from '@aqtiva/hooks/AuthHooks';

// This provider is intended to be surrounding the whole application.
// It should receive the users permissions as parameter
const PermissionProvider = ({ children }) => {
  const { user } = useAuthUser();
  const permissions = user?.roles ? [...user.roles] : null;
  // const permissions = [...user?.componentes ] ;

  // Creates a method that returns whether the requested permission is available in the list of permissions
  // passed as parameter
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

  // This component will render its children wrapped around a PermissionContext's provider whose
  // value is set to the method defined above
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
