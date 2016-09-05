import React from 'react';
import withShallowCompare from 'behaviours/with-shallow-compare';
import { model } from 'stores/model';
import withLocationPersistence from 'behaviours/with-location-persistence';
import uiStore from 'stores/ui';
import { setTitle } from 'stores/actions/meta';
import CharacterFactory from './';

const Character = CharacterFactory(
  React,
  withShallowCompare,
  withLocationPersistence
);

export default {
  path: ':character_id/:slug',
  component: Character,
  onEnter ( routerState ) {
    // TODO: move to react-side-effect implementation in route components
    model.getValue([
      'charactersById',
      routerState.params.character_id,
      'name',
    ]).subscribe( name => {
      uiStore.dispatch( setTitle( `${ name } (Character)` ) );
    });
  },
};
