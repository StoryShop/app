import React from 'react';
import withShallowCompare from 'behaviours/with-shallow-compare';
import { model } from 'stores/model';
import withLocationPersistence from 'behaviours/with-location-persistence';
import uiStore from 'stores/ui';
import { setTitle } from 'stores/actions/meta';
import OutlineFactory from './';

const Outline = OutlineFactory(
  React,
  withShallowCompare,
  withLocationPersistence
);

export default {
  path: ':outline_id',
  component: Outline,
  onEnter ( routerState ) {
    // TODO: move to react-side-effect implementation in route components
    model.getValue([
      'outlinesById',
      routerState.params.outline_id,
      'title',
    ]).subscribe( title => {
      uiStore.dispatch( setTitle( `${ title } (Outline)` ) );
    });
  },
};

