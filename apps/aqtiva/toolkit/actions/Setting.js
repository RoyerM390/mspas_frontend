import {
  SET_INITIAL_PATH,
  TOGGLE_NAV_COLLAPSED,
} from '@aqtiva/constants/ActionTypes';

export const toggleNavCollapsed = () => {
  return (dispatch) => dispatch({ type: TOGGLE_NAV_COLLAPSED });
};

export const setInitialPath = (initialPath) => {
  return (dispatch) =>
    dispatch({ type: SET_INITIAL_PATH, payload: initialPath });
};
