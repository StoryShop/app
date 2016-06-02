import Colors from 'colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

/**
 * Default theme
 *
 * FIXME: main.palette colors not working as expected
 */
export const main = {
  palette: {
    primary1Color: Colors.dusk500,
    primary2Color: Colors.dusk700,
    primary3Color: Colors.dusk800,
    accent1Color: Colors.berry500,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternativeTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
  },
};
export default main;

/**
 * Characters Theme
 */
export const characters = {
  palette: {
    primary1Color: Colors.aqua500,
  },
};

/**
 * Elements Theme
 */
export const elements = {
  palette: {
    primary1Color: Colors.grass500,
  },
};

/**
 * Outlines Theme
 */
export const outlines = {
  palette: {
    primary1Color: Colors.grape500,
  },
};

