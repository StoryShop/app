import React from 'react';
import AppBar from 'components/app-bar';
import { FlexContainer, Flex } from 'components/flex';
import uiStore from 'stores/ui';
import { setTitle, setTheme } from 'stores/actions/meta';

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
  onEnter () {
    // TODO: move to react-side-effect implementation in route components
    uiStore.dispatch( setTheme( 'outlines' ) );
    uiStore.dispatch( setTitle( 'Outlines' ) );
  },
};

