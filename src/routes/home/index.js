import React from 'react';
import AppBar from 'components/app-bar';

const Home = ({ children }) => (
  <div>
    <h1 className="home-header">Home</h1>
    { children }
  </div>
);
Home.displayName = 'Home';

export default Home;

