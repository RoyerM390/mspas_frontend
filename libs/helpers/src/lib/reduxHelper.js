import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from '@aqtiva/constants';

export const actions = (dispatch) => {
  return  {
     fetchStart:  () => {
      dispatch({ type: FETCH_START });
    },
     fetchError:  (message) => {
      dispatch({ type: FETCH_ERROR, payload: message });
    },
     fetchSuccess:  () => {
      dispatch({ type: FETCH_SUCCESS });
    },
     showMessage:  (message) => {
      dispatch({ type: SHOW_MESSAGE, payload: message });
    },
  }
}
