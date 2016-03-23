import React from 'react';
import OutlineListFactory from './';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withModel from 'behaviours/with-model';
import withLocationPersistence from 'behaviours/with-location-persistence';
import uiStore from 'stores/ui';
import { setTitle } from 'stores/actions/meta';

const OutlineList = OutlineListFactory(
  React,
  withShallowCompare,
  withModel,
  withLocationPersistence
);

export default {
  component: OutlineList,
  onEnter () {
    // TODO: move to react-side-effect implementation in route components
    uiStore.dispatch( setTitle( 'Outlines' ) );
  },
};

