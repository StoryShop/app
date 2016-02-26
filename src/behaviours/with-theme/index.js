import React from 'react';
import invariant from 'invariant';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

/**
 * withTheme behaviour
 */
export default ({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  
  getChildContext () {
    invariant(
      typeof this.muiTheme === 'function',
      'withTheme requires an `muiTheme` function on the component instance.'
    );

    return {
      muiTheme: ThemeManager.getMuiTheme( this.muiTheme() ),
    };
  },
});

