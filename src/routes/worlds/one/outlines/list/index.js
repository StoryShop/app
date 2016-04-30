import { Observable } from 'rxjs/Observable';
import fromPromise from 'rxjs/add/observable/fromPromise';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import reactStamp from 'react-stamp';
import connectToModel from 'behaviours/connect-to-model';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withPagination from 'behaviours/with-pagination';
import OutlineListFactory from 'components/outlines/list';

export function modelToProps ( model, props ) {
  const { world_id } = props.params;
  const path = [ 'worldsById', world_id, 'outlines' ];

  return Observable.fromPromise( model.get([ ...path, 'length' ]) )
    .concatMap( ({ json }) => {
      const length = json.worldsById[ world_id ].outlines.length;
      const paths = [
        [ ...path, { pagination: { from: 0, to: length } }, [ '_id', 'title' ] ],
      ];

      return model.get( ...paths ).then( v => v );
    })
    .map( ({ json }) => {
      const world = json.worldsById[ world_id ];

      return {
        world_id,
        path,
        outlines: world.outlines,
      };
    })
    ;
};

export function actions ( model ) {
  return {
  };
}

export default React => {
  const OutlineList = OutlineListFactory(
    React,
    withPagination,
    withShallowCompare
  );

  return connectToModel( React, modelToProps, actions, props => {
    const { outlines, world_id } = props;

    return (
      <OutlineList world_id={world_id} outlines={outlines} />
    );
  });
};

