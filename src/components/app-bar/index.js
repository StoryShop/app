import React from 'react';
import UpstreamAppBar from 'material-ui/lib/app-bar';

const AppBar = ({ title, currentWorld, ...props }) => (
    <UpstreamAppBar className='app-bar'
      title={`${title || 'StoryShop'}`}
      showMenuIconButton={currentWorld ? true : false}
      {...props}
    />
);
AppBar.displayName = 'AppBar';

export default AppBar;

