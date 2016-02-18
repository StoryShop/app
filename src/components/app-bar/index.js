import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default ({ title, ...props }) => (
  <AppBar title={`${title || 'StoryShop'}`} {...props} />
);

