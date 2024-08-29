import AppLoader from '../AppLoader';
import { HIDE_MESSAGE } from '@aqtiva/constants/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { message } from 'antd';

const AppInfoViewRedux = () => {
  const {
    error,
    loading,
    message: displayMessage,
  } = useSelector(({ common }) => common);

  const dispatch = useDispatch();
  const clearInfoView = () => {
    dispatch(dispatch({ type: HIDE_MESSAGE }));
  };

  useEffect(() => {
    if (error) {
      message.destroy();
      message.error(error);
      clearInfoView();
    }
  }, [error]);

  useEffect(() => {
    if (displayMessage) {
      message.destroy();
      message.success(displayMessage);
      clearInfoView();
    }
  }, [displayMessage]);

  return loading ? <AppLoader /> : null;
};

export default AppInfoViewRedux;
