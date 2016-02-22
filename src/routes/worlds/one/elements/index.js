import React from 'react';
import AppBar from 'components/app-bar';
import { FlexContainer, Flex } from 'components/flex';

export const Elements = ({ children }) => {
  return (
    <div>
      <h1 className="header">Elements</h1>
      { children }
    </div>
  );
};

export default {
  path: 'elements',
  component: Elements,
};

