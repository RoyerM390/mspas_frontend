import { combineReducers } from 'redux';
import Settings from './Setting';
import Common from './Common';
import Solicitud from './Solicitud';
import Prestamo from './Prestamo';

const reducers = () =>
  combineReducers({
    settings: Settings,
    common: Common,
  });
export default reducers;
