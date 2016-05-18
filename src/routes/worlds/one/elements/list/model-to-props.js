import { Observable } from 'rxjs/Observable';
import fromPromise from 'rxjs/add/observable/fromPromise';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import ElementList from 'components/elements/list';

export default function ( model, props ) {
  const { world_id, id } = props.params;
  const path = [ 'worldsById', world_id, 'elements' ];
  const prefetchPaths = [ [ ...path, 'length' ] ];

  if ( id ) {
    prefetchPaths.push([
      'elementsById',
      id,
      'files',
      'length'
    ]);
  }

  return Observable.fromPromise( model.get( ...prefetchPaths ) )
    .concatMap( ({ json }) => {
      const length = json.worldsById[ world_id ].elements.length;
      const filesLength = id ? json.elementsById[ id ].files.length : null;
      const fields = ElementList.modelPaths()
      let paths = fields
        .map( p => [ ...path, { from: 0, to: length }, ...p ])
        ;

      if ( id ) {
        paths = paths.concat( fields.map( f => [ 'elementsById', id, ...f ] ) );
      }

      if ( filesLength ) {
        paths.push([
          'elementsById',
          id,
          'files',
          { from: 0, to: filesLength - 1 },
          [ 'name', 'url' ]
        ]);
      }

      return model.get( ...prefetchPaths, ...paths ).then( v => v );
    })
    .map( ({ json }) => {
      const world = json.worldsById[ world_id ];
      const currentElement = id ? json.elementsById[ id ] : undefined;

      return {
        world_id,
        elements: world.elements,
        currentElement,
      };
    })
    ;
};

