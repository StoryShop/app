import React from 'react';
import AppBar from '../../components/app-bar';

export default ({ children }) => (
  <div>
    <AppBar title="Home" />
    <h1 className="home-header">Home</h1>
    { children }
  </div>
);

