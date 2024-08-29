import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useAuthUser } from '@aqtiva/hooks/AuthHooks';
import AppLoader from '@aqtiva/components/AppLoader';
import PropTypes from 'prop-types';
import { initialUrl, SET_ONLINE } from '@aqtiva/constants';
import { useDispatch } from 'react-redux';

const withData = (ComposedComponent) => (props) => {
  const { user, isLoading } = useAuthUser();
  const { asPath, query } = useRouter();
  const queryParams = asPath.split('?')[1];
  const [paths, setPaths] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
      dispatch({ type: SET_ONLINE, payload: navigator.onLine });
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  useEffect(() => {
    getPaths(user.routes || []);
  }, []);

  useEffect(() => {
    if (isAuthorized === false) {
      Router.push('/inicio' + (queryParams ? '?' + queryParams : ''));
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (asPath === initialUrl) {
      setIsAuthorized(true);
    } else if (asPath.indexOf('?') > 0) {
      const substring = asPath.substring(0, asPath.indexOf('?'));
      if (paths.length > 0 && !paths.includes(substring))
        setIsAuthorized(false);
      else if (paths.length > 0 && paths.includes(substring))
        setIsAuthorized(true);
    } else {
      if (paths.length > 0 && !paths.includes(asPath)) setIsAuthorized(false);
      else if (paths.length > 0 && paths.includes(asPath))
        setIsAuthorized(true);
    }
  }, [paths]);

  const getPaths = (routes) => {
    setLocalLoading(true);
    const pathsLocal = [];
    for (const route of routes) {
      if (route.other_rutas && route.other_rutas.length > 0) {
        getPaths(route.other_rutas);
      } else {
        if (query.slug && route.path.indexOf('/*') >= 0) {
          pathsLocal.push(route.path.replace('/*', `/${query.slug}`));
        } else {
          pathsLocal.push(route.path);
        }
      }
    }
    setPaths((prevState) => [...prevState, ...pathsLocal]);
    setLocalLoading(false);
  };

  useEffect(() => {
    if (!user && !isLoading) {
      Router.push('/' + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, isLoading, queryParams]);
  if (!user || isLoading || localLoading) return <AppLoader />;

  return isAuthorized && <ComposedComponent {...props} />;
};

export default withData;
withData.propTypes = {
  ComposedComponent: PropTypes.elementType.isRequired,
  props: PropTypes.any,
};
