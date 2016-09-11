import React from 'react';
import connectToModel from 'behaviours/connect-to-model';
import mapModelToProps from './model-to-props';
import mapActionsToProps from './actions';
import Items from 'components/characters/items';

export default connectToModel( React, mapModelToProps, mapActionsToProps, Items );

