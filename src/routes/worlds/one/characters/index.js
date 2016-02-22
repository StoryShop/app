import React from 'react';
import AppBar from 'components/app-bar';
import { FlexContainer, Flex } from 'components/flex';

export const Characters = ({ children }) => {
  return (
    <div>
      <h1 className="header">Characters</h1>
      { children }
    </div>
  );
};

export default {
  path: 'characters',
  component: Characters,
};

