import { Observable } from 'rxjs/Observable';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import fromPromise from 'rxjs/add/observable/fromPromise';
import reactStamp from 'react-stamp';
import connectToModel from 'behaviours/connect-to-model';
import Jumbotron from 'components/worlds/jumbotron';

function modelToProps ( model, props ) {
  const { world_id } = props.params;
  const paths = [
    [ 'worldsById', world_id, [
      'title',
      'colour',
    ]],
    [ 'worldsById', world_id, 'elements', 'length' ],
    [ 'worldsById', world_id, 'characters', 'length' ],
    [ 'worldsById', world_id, 'outlines', 'length' ],
  ];

  return Observable.fromPromise( model.get( ...paths ) )
    .map( ({ json }) => {
      const world = json.worldsById[ world_id ];

      return {
        world_id,
        ...world,
      };
    })
    ;
}

function actions ( model ) {
  return {
    setTitle ( id, title ) {
      model.setValue( [ 'worldsById', id, 'title' ], title );
    },
  };
}

export default ( React, ...behaviours ) => {
  return connectToModel( React, modelToProps, actions, props => {
    const {
      world_id,
      children,

      colour,
      title,
      outlines,
      elements,
      characters,

      setTitle,
    } = props;

    return (
      <div>
        <Jumbotron
          worldId={world_id}
          colour={colour}
          title={title}
          outlines={outlines.length}
          characters={characters.length}
          elements={elements.length}
          onTitleChange={title => setTitle( world_id, title )}
        />
      </div>
    );
  });
};

