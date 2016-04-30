import { Observable } from 'rxjs/Observable';
import fromPromise from 'rxjs/add/observable/fromPromise';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import ElementList from 'components/elements/list';

export default function ( model, props ) {
  const { world_id } = props.params;
  const path = [ 'worldsById', world_id, 'elements' ];

  return Observable.fromPromise( model.get([ ...path, 'length' ]) )
    .concatMap( ({ json }) => {
      const length = json.worldsById[ world_id ].elements.length;
      const paths = ElementList.modelPaths({ pagination: { from: 0, to: length } })
        .map( p => [ ...path, ...p ])
        ;

      return model.get( ...paths ).then( v => v );
    })
    .map( ({ json }) => {
      const world = json.worldsById[ world_id ];

      return {
        world_id,
        elements: world.elements,
      };
    })
    ;
};

