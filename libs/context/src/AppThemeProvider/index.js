import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import { useLayoutContext } from "../AppContextProvider/LayoutContextProvider";
import { useLocaleContext } from "../AppContextProvider/LocaleContextProvider";
import { useThemeContext } from "../AppContextProvider/ThemeContextProvider";
// import AppLocale from "@aqtiva/services/localization";
import { getAntTheme } from "@aqtiva/helpers";
import locale from 'antd/locale/es_ES';
import 'dayjs/locale/es';

const AppThemeProvider = (props) => {
  const { direction } = useLayoutContext();
  // const { locale } = useLocaleContext();
  const { theme } = useThemeContext();

  // const { antLocale } = AppLocale[locale.locale];

  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        direction={direction}
        locale={locale}
        theme={{
          token: getAntTheme(theme),
        }}
      >
        {props.children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default React.memo(AppThemeProvider);

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
