import React from 'react';

const App = ({ name, ...props }) => (
  <h1 {...props}>Hello, {name}!</h1>
);

export default App;

