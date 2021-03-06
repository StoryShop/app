import React from 'react';
import ElementListFactory from './';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withLocationPersistence from 'behaviours/with-location-persistence';
import uiStore from 'stores/ui';
import { setTitle } from 'stores/actions/meta';

const ElementList = ElementListFactory(
  React,
  withShallowCompare,
  withLocationPersistence
);

export default {
  component: ElementList,
  onEnter () {
    // TODO: move to react-side-effect implementation in route components
    uiStore.dispatch( setTitle( 'Elements' ) );
  },
};

