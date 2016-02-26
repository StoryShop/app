import React from 'react';
import AppBar from 'components/app-bar';
import { FlexContainer, Flex } from 'components/flex';
import uiStore from 'stores/ui';
import { setTitle } from 'stores/actions/meta';

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
  onEnter () {
    // TODO: move to react-side-effect implementation in route components
    uiStore.dispatch( setTitle( 'Elements' ) );
  },
};

