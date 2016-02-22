import React from 'react';
import AppBar from 'components/app-bar';
import { FlexContainer, Flex } from 'components/flex';

export const Outlines = ({ children }) => {
  return (
    <div>
      <h1 className="header">Outlines</h1>
      { children }
    </div>
  );
};

export default {
  path: 'outlines',
  component: Outlines,
};

