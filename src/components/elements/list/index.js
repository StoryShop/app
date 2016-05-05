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

export default reactStamp( React ).compose({
  init ( props ) {
    this.state = {
      addingElement: false,
      ...this._setElementViewing( props ),
    }
  },

  _setElementViewing ( props ) {
    const { currentElementId, elements } = props;

    if ( ! currentElementId ) {
      return { viewingElement: false, currentElement: null };
    }

    const elementList = Object.getOwnPropertyNames( elements )
      .filter( k => k.match( /^\d+$/ ) )
      .sort()
      .reverse()
      ;

    const currentElementIdx = elementList.find( k => elements[ k ]._id === currentElementId );
    const currentElement = currentElementIdx ? elements[ currentElementIdx ] : null;

    return { viewingElement: true, currentElement };
  },

  _closeElement () {
    this.setState( this._setElementViewing({}), () => setTimeout( () => hashHistory.push( paths.elementList( this.props.world_id ) ), 1 ) );
  },

  componentWillReceiveProps ( newProps ) {
    if ( newProps.currentElementId !== this.props.currentElementId ) {
      this.setState( this._setElementViewing( newProps ) );
    }
  },

  _promptForElement () {
    this.setState({ addingElement: true });
  },

  render () {
    const {
      world_id,
      elements,
      setContent,
      setTitle,
      deleteElement,
      addElement,
    } = this.props;

    const { viewingElement, currentElement } = this.state;

    const elementList = Object.getOwnPropertyNames( elements )
      .filter( k => k.match( /^\d+$/ ) )
      .sort()
      .reverse()
      ;

    const styles = {
      card: {
        cursor: 'pointer',
      },

      floatingCard: {
        position: 'fixed',
        margin: 'auto',
        maxHeight: '80%',
        maxWidth: '80%',
        height: 'auto',
        width: 1200,
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
            style={styles.card}
            {...element}
          /> }
        </div>
      ));

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
        >
          <ElementCard
            readOnly={false}
            world_id={world_id}
            setTitle={setTitle}
            setContent={setContent}
            deleteElement={deleteElement}
            style={styles.card}
            {...currentElement}
          />
        </Dialog>

        <span flex />

        <FlexLayout direction="row">
          <span flex />
          <FloatingActionButton onClick={e => this._promptForElement()}>
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
    modelPaths ( conf ) {
      const pagination = conf.pagination;

      return [
        [ pagination, [
          '_id',
          'title',
          'content',
          'cover',
          'tags',
        ]],
      ];
    },
  },
})

