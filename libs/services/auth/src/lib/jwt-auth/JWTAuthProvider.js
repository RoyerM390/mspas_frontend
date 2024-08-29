import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import JwtAxios from './index';
import axios from 'axios';
import Router from 'next/router';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({
  children,
  fetchStart,
  fetchSuccess,
  fetchError,
  url,
}) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const axiosInstance = new JwtAxios(url);
  const jwtAxios = axiosInstance.init();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      axiosInstance.setAuthToken(token);
      axios({
        method: 'post', //you can set what request you want to be
        url: url + '/auth',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        data: {},
      })
        .then(({ data }) =>
          setJWTAuthData({
            user: { ...data },
            isLoading: false,
            isAuthenticated: true,
          })
        )
        .catch(() =>
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          })
        );
    };

    getAuthUser();
  }, []);

  const signInUser = async ({ usuario, clave }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post('/auth/login', {
        usuario,
        clave,
      });
      localStorage.setItem('token', data.token);
      axiosInstance.setAuthToken(data.token);
      const res = await jwtAxios.post('/auth');
      setJWTAuthData({
        user: { ...res.data },
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error?.response?.data?.error || 'Something went wrong');
    }
  };

  const signUpUser = async ({ usuario, clave }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post('/auth/login', {
        usuario,
        clave,
      });
      localStorage.setItem('token', data.token);
      axiosInstance.setAuthToken(data.token);
      const res = await axios({
        method: 'post', //you can set what request you want to be
        url: url + '/auth',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        data: {},
      });
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log('error:', error.response.data.error);
      fetchError(error?.response?.data?.error || 'Something went wrong');
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    axiosInstance.setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    Router.push('/');
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
