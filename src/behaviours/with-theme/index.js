import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

/**
 * withTheme behaviour
 */
export default theme => ({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  
  getChildContext () {
    return {
      muiTheme: ThemeManager.getMuiTheme( theme ),
    };
  },
});

