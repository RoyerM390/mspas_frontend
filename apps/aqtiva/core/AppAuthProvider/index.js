import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '@aqtiva/constants/ActionTypes';
import JWTAuthAuthProvider from '@aqtiva/services/auth/JWTAuthProvider';
import {url} from '@aqtiva/constants/api';

const AppAuthProvider = ({ children, data }) => {
  const dispatch = useDispatch();
  const fetchStart = () => {
    dispatch({ type: FETCH_START });
  };
  const fetchError = (message) => {
    dispatch({ type: FETCH_ERROR, payload: message });
  };
  const fetchSuccess = () => {
    dispatch({ type: FETCH_SUCCESS });
  };
  const showMessage = (message) => {
    dispatch({ type: SHOW_MESSAGE, payload: message });
  };

  return (
    <JWTAuthAuthProvider
      fetchStart={fetchStart}
      fetchError={fetchError}
      fetchSuccess={fetchSuccess}
      showMessage={showMessage}
      url={url}
    >
      {children}
    </JWTAuthAuthProvider>
  );
};

export default AppAuthProvider;
