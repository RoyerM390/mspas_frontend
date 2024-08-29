import * as React from 'react';
import PropTypes from 'prop-types';
import AppContextProvider from '@aqtiva/context/AppContextProvider';
import AppThemeProvider from '@aqtiva/context/AppThemeProvider';
import AppLocaleProvider from '@aqtiva/context/AppLocaleProvider';
import AppAuthProvider from '../core/AppAuthProvider';
import AuthRoutes from '@aqtiva/components/AuthRoutes';
import AppPageMeta from '@aqtiva/components/AppPageMeta';
import 'antd/dist/reset.css';
import '../public/styles/index.css';
import { GlobalStyles } from '../core/theme/GlobalStyle';
import { Normalize } from 'styled-normalize';
import configureStore from '../toolkit/store';
import { Provider } from 'react-redux';
import 'simplebar-react/dist/simplebar.min.css';
import AppInfoView from '@aqtiva/components/AppInfoView';

// Client-side cache, shared for the whole session of the user in the browser.
const store = configureStore();

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <AppContextProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <AppLocaleProvider>
            <AppAuthProvider>
              <AuthRoutes>
                <AppPageMeta />
                <GlobalStyles />
                <Normalize />
                <AppInfoView />
                <Component {...pageProps} />
              </AuthRoutes>
            </AppAuthProvider>
          </AppLocaleProvider>
        </AppThemeProvider>
      </Provider>
    </AppContextProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
