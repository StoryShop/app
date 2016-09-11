import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import Avatar from 'components/characters/avatar';
import Attributes from 'components/characters/attributes';
import Dna from 'components/characters/dna';
import Relationships from 'components/characters/relationships';

export default function modelToProps ( model, props ) {
  return Observable.of({
    character: {
      name: 'Joe'
    },
    items: {
      length: 2,
      0: {
        _id: '1',
          name: 'Magic Flute',
      },
      1: {
        _id: '2',
          name: 'Sword of Gondhor',
      },
      2: {
        _id: '3',
          name: 'Amulet of Truthiness',
      },
    },
  });

  /**
   * it would really be like this...
   */
  const { character_id } = props.params;
  const path = [ 'charactersById', character_id, 'items' ];

  const prefetchPaths = [
    [ ...path, 'length' ],
  ];

  return Observable.fromPromise( model.get( ...prefetchPaths ) )
    .concatMap( data => {
      const { json } = data;
      const {
        items,
      } = json.charactersById[ character_id ];

      const paths = [
        [ ...path, { from: 0, to: items.length }, [ '_id', 'name' ] ],
      ];

      // 'charactersById', '1234', 'items', { from: 0, to: items.length }, [ '_id', 'name' ]
      return model.get( ...paths, ...prefetchPaths ).then( v => v );
    })
    .map( ({ json }) => {
      const items = json.charactersById[ character_id ].items;

      return {
        items,
      };
    })
    ;
}

