import reactStamp from 'react-stamp';
import connectToModel from 'behaviours/connect-to-model';
import CharacterList from 'components/characters/list';
import modelToProps from './model-to-props';
import actions from './actions';

export const CharacterListRoute = React => ({
  characters,
  world_id,
  addCharacter,
}) => {
  return (
    <CharacterList
      world_id={world_id}
      characters={characters}
      addCharacter={addCharacter}
    />
  );
};

export default ( React ) => connectToModel( React, modelToProps, actions, CharacterListRoute( React ) );
