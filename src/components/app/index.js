import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

const App = ({ name, ...props }) => (
  <AppBar title={`Hello, ${name}!`} />
);

export default App;

