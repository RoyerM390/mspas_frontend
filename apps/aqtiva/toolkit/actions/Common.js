import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_DATA,
  HIDE_MESSAGE,
  SET_FILTER,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
} from '@aqtiva/constants/ActionTypes';

export const fetchStart = () => {
  return (dispatch) => dispatch({ type: FETCH_START });
};

export const fetchSuccess = () => {
  return (dispatch) => dispatch({ type: FETCH_SUCCESS });
};

export const fetchError = (error) => {
  return (dispatch) => dispatch({ type: FETCH_ERROR, payload: error });
};

export const showMessage = (message) => {
  return (dispatch) => dispatch({ type: SHOW_MESSAGE, payload: message });
};

export const getData = (getData) => {
  return (dispatch) => dispatch({ type: GET_DATA, payload: () => getData });
};
export const onToggleAppDrawer = () => {
  return (dispatch) => dispatch({ type: TOGGLE_APP_DRAWER });
};

export const hideMessage = () => {
  return (dispatch) => dispatch({ type: HIDE_MESSAGE });
};

export const setFilter = (filter) => {
  return (dispatch) => dispatch({ type: SET_FILTER, payload: filter });
};
