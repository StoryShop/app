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
    params: { id },

    setTitle,
    setContent,
    setCover,
    deleteElement,
    addElement,
    addAttachment,
  } = props;

  return (
    <ElementList
      world_id={world_id}
      elements={elements}
      currentElementId={id}
      setTitle={setTitle}
      setContent={setContent}
      setCover={setCover}
      deleteElement={deleteElement}
      addElement={addElement}
      addAttachment={addAttachment}
    />
  );
});

