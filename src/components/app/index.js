import React from 'react';
import reactStamp from 'react-stamp';
import withTheme from '../../behaviours/with-theme';
import defaultTheme from '../../themes';

export const App = reactStamp( React ).compose({
  displayName: 'App',

  render () {
    return ( <div>{this.props.children}</div> );
  }
}, withTheme( defaultTheme ) );

export default App;

