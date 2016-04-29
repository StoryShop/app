import reactStamp from 'react-stamp';
import connectToModel from 'behaviours/connect-to-model';
import CharacterList from 'components/characters/list';
import modelToProps from './model-to-props';
import actions from './actions';

export const CharacterListRoute = React => ({ characters, world_id }) => {
  return (
    <CharacterList world_id={world_id} characters={characters} />
  );
};

export default ( React ) => connectToModel( React, modelToProps, actions, CharacterListRoute( React ) );

