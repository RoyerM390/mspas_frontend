import React from "react";
import IntlMessages from "@aqtiva/helpers/IntlMessages";
import themeColorSets from "@aqtiva/constants/ColorSets";
import CustomColorCell from "../ColorCell";
import { useThemeActionsContext, useThemeContext } from "@aqtiva/context/ThemeContextProvider";
import AppGrid from "../../AppGrid";
import { StyledThemeColorSetting, StyledThemeColorSettingTitle } from "./index.styled";

const ThemeColors = () => {
  const {theme} = useThemeContext();

  const {updateTheme} = useThemeActionsContext();

  const updateThemeColors = (colorSet) => {
    theme.palette.primary.main = colorSet.primary.main;
    theme.palette.secondary.main = colorSet.secondary.main;
    theme.palette.background = colorSet.background;
    theme.palette.mode = colorSet.mode;
    theme.palette.text = colorSet.text;

    updateTheme({...theme});
  };
  return (
    <StyledThemeColorSetting>
      <StyledThemeColorSettingTitle>
        <IntlMessages id='customizer.themeColors' />
      </StyledThemeColorSettingTitle>
      <AppGrid
        data={themeColorSets}
        itemPadding={5}
        responsive={{
          xs: 1,
          sm: 2,
        }}
        renderItem={(colorSet, index) => (
          <CustomColorCell
            key={index}
            updateThemeColors={updateThemeColors}
            themeColorSet={colorSet}
          />
        )}
      />
    </StyledThemeColorSetting>
  );
};

export default ThemeColors;
