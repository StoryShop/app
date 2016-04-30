import React from 'react';
import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import Avatar from 'material-ui/lib/avatar';
import OutlineIcon from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import FlatButton from 'material-ui/lib/flat-button';
import Prompt from 'components/prompt';
import { FlexLayout } from 'components/flex';
import * as paths from 'utils/paths';

export default reactStamp( React ).compose({
  state: {
    addingOutline: false,
  },

  _promptForOutline () {
    this.setState({ addingOutline: true });
  },

  _addOutline ( name ) {
    this.props.addOutline( this.props.world_id, name );
  },

  render () {
    const {
      world_id,
      outlines,
    } = this.props;

    const outlineEls = Object.getOwnPropertyNames( outlines )
      .filter( k => k.match( /^\d+$/ ) )
      .sort()
      .reverse()
      .map( k => ({ idx: k, outline: outlines[ k ] }) )
      .map( ({ idx, outline }) => (
        <ListItem key={idx}
          leftAvatar={<Avatar icon={<OutlineIcon />} />}
          containerElement={<Link to={paths.outline(world_id,outline._id)} />}
          primaryText={outline.title}
        />
      ));

    return (
      <FlexLayout direction="column">
        {
          outlineEls.length
            ? <List style={{marginBottom: 10}}>{ outlineEls }</List>
            : <p>You have no outlines. Click the "+" button to create one.</p>
        }

        <span flex />

        <FlexLayout direction="row">
          <span flex />
          <FloatingActionButton onClick={e => this._promptForOutline()}>
            <AddIcon />
          </FloatingActionButton>
          <Prompt
            okLabel='Create'
            label='Outline Title'
            title='Create a New Outline'
            setValue={val=>this._addOutline( val )}
            open={this.state.addingOutline}
            onClose={e=>this.setState({ addingOutline: false })}
          />
        </FlexLayout>
      </FlexLayout>
    );
  },
});

