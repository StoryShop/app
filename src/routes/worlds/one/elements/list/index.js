import { Observable } from 'rxjs/Observable';
import reactStamp from 'react-stamp';
import connectToModel from 'behaviours/connect-to-model';
import ElementList from 'components/elements/list';
import modelToProps from './model-to-props';
import actions from './actions';

export default React => connectToModel( React, modelToProps, actions, props => {
  const {
    world_id,
    elements,

    setTitle,
    setContent,
    deleteElement,
    addElement,
  } = props;

  return (
    <ElementList
      world_id={world_id}
      elements={elements}
      setTitle={setTitle}
      setContent={setContent}
      deleteElement={deleteElement}
      addElement={addElement}
    />
  );
});

