import React from 'react';
import AppBar from 'components/app-bar';
import { FlexContainer, Flex } from 'components/flex';

export default ({ children }) => {
  return (
    <div>
      <AppBar title='World Settings' />
      <h1 className="header">Settings</h1>
      { children }
    </div>
  );
};

