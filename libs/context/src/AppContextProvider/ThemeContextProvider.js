import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import defaultConfig, { defaultTheme } from '@aqtiva/constants/defaultConfig';
import PropTypes from 'prop-types';
import { LayoutDirection } from '@aqtiva/constants/AppEnums';
import themeColorSets from '@aqtiva/constants/ColorSets';

const ThemeContext = createContext(undefined);
const ThemeActionsContext = createContext(undefined);

export const useThemeContext = () => useContext(ThemeContext);

export const useThemeActionsContext = () => useContext(ThemeActionsContext);

const ThemeContextProvider = ({ children }) => {
  defaultTheme.theme.palette.primary.main = themeColorSets[0].primary.main;
  defaultTheme.theme.palette.secondary.main = themeColorSets[0].secondary.main;
  defaultTheme.theme.palette.background = themeColorSets[0].background;
  defaultTheme.theme.palette.mode = themeColorSets[0].mode;
  defaultTheme.theme.palette.text = themeColorSets[0].text;
  const [theme, setTheme] = useState(defaultTheme.theme);
  // const [theme, setTheme] = useState(themeColorSets[10]);
  const [themeMode, updateThemeMode] = useState(defaultConfig.themeMode);
  const [themeStyle, updateThemeStyle] = useState(defaultConfig.themeStyle);

  const updateTheme = useCallback((theme) => {
    setTheme(theme);
  }, []);

  useEffect(() => {
    if (theme.direction === LayoutDirection.RTL) {
      document.body.setAttribute('dir', LayoutDirection.RTL);
    } else {
      document.body.setAttribute('dir', LayoutDirection.LTR);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeStyle,
        themeMode,
      }}
    >
      <ThemeActionsContext.Provider
        value={{
          updateTheme,
          updateThemeStyle,
          updateThemeMode,
        }}
      >
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
