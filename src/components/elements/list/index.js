import React from 'react';
import reactStamp from 'react-stamp';
import { hashHistory } from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import FlatButton from 'material-ui/lib/flat-button';
import ElementCard from 'components/elements/card';
import Prompt from 'components/prompt';
import { FlexLayout } from 'components/flex';
import * as paths from 'utils/paths';
import keys from 'utils/model-to-array';

export default reactStamp( React ).compose({
  init ( props ) {
    this.state = {
      addingElement: false,
      viewingElement: props.currentElement ? true : false,
    }
  },

  _closeElement () {
    this.setState(
      this.setState({ viewingElement: false }),
      () => setTimeout( () => hashHistory.push( paths.elementList( this.props.world_id ) ), 1 )
    );
  },

  componentWillReceiveProps ( newProps ) {
    if ( newProps.currentElement !== this.props.currentElement ) {
      this.setState({ viewingElement: newProps.currentElement ? true : false });
    }
  },

  _promptForElement () {
    this.setState({ addingElement: true });
  },

  render () {
    const {
      world_id,
      elements,
      currentElement,
      setContent,
      setTitle,
      setCover,
      deleteElement,
      addElement,
      addAttachment,
      deleteAttachment,
    } = this.props;

    const { viewingElement } = this.state;

    const elementList = keys( elements )
      .sort()
      .reverse()
      ;

    const styles = {
      card: {
        cursor: 'pointer',
      },

      floatingCard: {
      },
    };

    const elementEls = elementList
      .map( k => ({ idx: k, element: elements[ k ] }) )
      .map( ({ idx, element }) => (
        <div
          key={idx}
          style={{width: '25%'}}
        >
          { currentElement && element._id === currentElement._id ? null : <ElementCard
            onClick={e => hashHistory.push( paths.element( world_id, element._id ) )}
            readOnly={true}
            world_id={world_id}
            deleteElement={deleteElement}
            setCover={setCover}
            addAttachment={addAttachment}
            style={styles.card}
            {...element}
          /> }
        </div>
      ));

    if ( currentElement ) {
      currentElement.files = keys( currentElement.files )
        .map( k => currentElement.files[ k ] )
        ;
    }

    return (
      <FlexLayout direction="column">
        {
          elementEls.length
            ? <FlexLayout direction="row" wrap padding={10} style={{marginBottom: 10}}>
                { elementEls }
              </FlexLayout>
            : <p>You have no elements. Click the "+" button to create one.</p>
        }

        <Dialog
          open={viewingElement}
          onRequestClose={e => this._closeElement()}
          autoScrollBodyContent={true}
          bodyStyle={{padding:0}}
        >
          { currentElement ? <ElementCard
            readOnly={false}
            world_id={world_id}

            setTitle={setTitle}
            setContent={setContent}
            setCover={setCover}
            deleteElement={deleteElement}
            addAttachment={addAttachment}
            deleteAttachment={deleteAttachment}

            style={styles.floatingCard}
            {...currentElement}
          /> : null }
        </Dialog>

        <span flex />

        <FlexLayout direction="row">
          <span flex />
          <FloatingActionButton
            onClick={e => this._promptForElement()}
            disableTouchRipple={true}
          >
            <AddIcon />
          </FloatingActionButton>
          <Prompt
            okLabel='Create'
            label='Element Title'
            title='Create a New Element'
            setValue={val=>addElement( world_id, val )}
            open={this.state.addingElement}
            onClose={e=>this.setState({ addingElement: false })}
          />
        </FlexLayout>
      </FlexLayout>
    );
  },

  statics: {
    modelPaths () {
      return [
        [[
          '_id',
          'title',
          'content',
          'tags',
        ]],
        [ 'cover', 'url' ],
      ];
    },
  },
})

