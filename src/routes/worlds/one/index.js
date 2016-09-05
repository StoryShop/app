import React from 'react';
import WorldSettingsFactory from './settings';
import elements from './elements';
import characters from './characters';
import outlines from './outlines';
import uiStore from 'stores/ui';
import { setTitle, setTheme } from 'stores/actions/meta';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withLocationPersistence from 'behaviours/with-location-persistence';

export const World = ({ children }) => ( children );

const WorldSettings = WorldSettingsFactory(
  React,
  withShallowCompare,
  withLocationPersistence
);

export default {
  path: ':world_id/:slug',
  component: World,
  indexRoute: {
    component: WorldSettings,
    onEnter () {
      // TODO: move to react-side-effect implementation in route components
      uiStore.dispatch( setTheme( 'main' ) );
      uiStore.dispatch( setTitle( 'World Settings' ) );
    },
  },
  childRoutes: [
    elements,
    outlines,
    characters,
  ],
};
