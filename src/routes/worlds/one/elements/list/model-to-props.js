import { Observable } from 'rx';
import ElementList from 'components/elements/list';

export default function ( model, props ) {
  const { world_id } = props.params;
  const path = [ 'worldsById', world_id, 'elements' ];

  return Observable.fromPromise( model.get([ ...path, 'length' ]) )
    .flatMap( ({ json }) => {
      const length = json.worldsById[ world_id ].elements.length;
      const paths = ElementList.modelPaths({ pagination: { from: 0, to: length } })
        .map( p => [ ...path, ...p ])
        ;

      return model.get( ...paths );
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

