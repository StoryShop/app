import { Observable } from 'rxjs/Observable';
import fromPromise from 'rxjs/add/observable/fromPromise';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import reactStamp from 'react-stamp';
import connectToModel from 'behaviours/connect-to-model';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withPagination from 'behaviours/with-pagination';
import OutlineList from 'components/outlines/list';

export function modelToProps ( model, props ) {
  const { world_id } = props.params;
  const path = [ 'worldsById', world_id, 'outlines' ];
  const prefetchPath = [ ...path, 'length' ];

  return Observable.fromPromise( model.get( prefetchPath ) )
    .concatMap( ({ json }) => {
      const length = json.worldsById[ world_id ].outlines.length;
      const paths = [
        [ ...path, { from: 0, to: length - 1 }, [ '_id', 'title' ] ],
      ];

      return model.get( prefetchPath, ...paths ).then( v => v );
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
    addOutline ( world_id, title ) {
      model.call([
        'worldsById',
        world_id,
        'outlines',
        'push',
      ], [ title ]);
    },
  };
}

export default React => connectToModel( React, modelToProps, actions, props => {
  const {
    outlines,
    world_id,
    addOutline,
  } = props;

  return (
    <OutlineList
      world_id={world_id}
      outlines={outlines}
      addOutline={addOutline}
    />
  );
});

