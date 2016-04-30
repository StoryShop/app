import { Observable } from 'rxjs/Observable';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import fromPromise from 'rxjs/add/observable/fromPromise';
import CharacterList from 'components/characters/list';

export default function ( model, props ) {
  const { world_id } = props.params;
  const path = [ 'worldsById', world_id, 'characters' ];

  return Observable.fromPromise( model.get([ ...path, 'length' ]) )
    .concatMap( ({ json }) => {
      const length = json.worldsById[ world_id ].characters.length;
      const paths = CharacterList.modelPaths({ pagination: { from: 0, to: length - 1 } })
        .map( p => [ ...path, ...p ])
        ;

      return model.get( ...paths ).then( v => v );
    })
    .map( ({ json }) => {
      const world = json.worldsById[ world_id ];

      return {
        world_id,
        path,
        characters: world.characters,
      };
    })
    ;
};

