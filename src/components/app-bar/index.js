import React from 'react';
import UpstreamAppBar from 'material-ui/lib/app-bar';

const AppBar = ({ title, ...props }) => (
  <UpstreamAppBar title={`${title || 'StoryShop'}`} {...props} />
);
AppBar.displayName = 'AppBar';

export default AppBar;

