import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

/**
 * Default theme
 */
export const defaultTheme = {
  palette: {
    primary1Color: Colors.blueGrey500,
    primary2Color: Colors.blueGrey700,
    primary3Color: Colors.blueGrey800,
    accent1Color: Colors.pinkA200,
    accent3Color: Colors.pink100,
    accent3Color: Colors.pink400,
    textColor: Colors.darkBlack,
    alternativeTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
  },
};
export default defaultTheme;

/**
 * Characters Theme
 */
export const characterTheme = {
  palette: {
    primary1Color: Colors.blue500,
  },
};

/**
 * Elements Theme
 */
export const elementTheme = {
  palette: {
    primary1Color: Colors.green500,
  },
};

/**
 * Outlines Theme
 */
export const outlineTheme = {
  palette: {
    primary1Color: Colors.purple500,
  },
};

