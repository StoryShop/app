import { Observable } from 'rxjs/Observable';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import fromPromise from 'rxjs/add/observable/fromPromise';
import Avatar from 'components/characters/avatar';
import Attributes from 'components/characters/attributes';
import Dna from 'components/characters/dna';
import Relationships from 'components/characters/relationships';

export default function modelToProps ( model, props ) {
  const { world_id, character_id } = props.params;
  const path = [ 'charactersById', character_id ];

  const prefetchPaths = [
    [ ...path, 'attributes', 'length' ],
    [ ...path, 'relationships', 'length' ],
    [ ...path, 'genes', 'length' ],
  ];

  return Observable.fromPromise( model.get( ...prefetchPaths ) )
    .concatMap( data => {
      const { json } = data;
      const {
        attributes,
        genes,
        relationships,
      } = json.charactersById[ character_id ];

      let paths = [
        [ ...path, 'content' ],
        [ ...path, 'cover', 'url' ],
      ];

      paths = paths.concat(
        Avatar.modelPaths({ pagination: { from: 0, to: attributes.length } })
          .map( p => [ ...path, ...p ])
      );

      paths = paths.concat(
        Attributes.modelPaths({ pagination: { from: 0, to: attributes.length } })
          .map( p => [ ...path, ...p ])
      );

      paths = paths.concat(
        Dna.modelPaths({ prefix: path, pagination: { from: 0, to: genes.length } })
      );

      paths = paths.concat(
        Relationships.modelPaths({ pagination: { from: 0, to: relationships.length } })
          .map( p => [ ...path, ...p ])
      );

      return model.get( ...paths, ...prefetchPaths ).then( v => v );
    })
    .map( ({ json }) => {
      const character = json.charactersById[ character_id ];

      return {
        _id: character_id,
        world_id,
        path,
        ...character,
        randomGene: json.genes.random,
      };
    })
    ;
}

