import React from 'react';
import reactStamp from 'react-stamp';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import FlatButton from 'material-ui/lib/flat-button';
import ElementCard from 'components/elements/card';
import Prompt from 'components/prompt';
import { FlexLayout } from 'components/flex';
import * as paths from 'utils/paths';

export default reactStamp( React ).compose({
  state: {
    addingElement: false,
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

    const styles = {
      card: {
        // cursor: 'pointer',
      },
    };

    const elementEls = Object.getOwnPropertyNames( elements )
      .filter( k => k.match( /^\d+$/ ) )
      .sort()
      .reverse()
      .map( k => ({ idx: k, element: elements[ k ] }) )
      .map( ({ idx, element }) => (
        <div
          key={idx}
          style={{width: '25%'}}
        >
          <ElementCard
            world_id={world_id}
            setTitle={setTitle}
            setContent={setContent}
            deleteElement={deleteElement}
            style={styles.card}
            {...element}
          />
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

