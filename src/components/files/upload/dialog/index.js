import React from 'react';
import reactStamp from 'react-stamp';
import fetchPolyfill from 'whatwg-fetch';
import { Model } from 'falcor';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FromComputer from 'components/files/upload/from-computer';
import store from 'stores/ui';
import model from 'stores/model';

const $ref = Model.ref;

export default reactStamp( React ).compose({
  init ( props ) {
    this.state = {
      open: false,
    };
  },

  _selectFile ( ref ) {
    this.props.onSelect( ref );
  },

  _upload ( files ) {
    // TODO: ensure file is an image

    const jwt = store.getState().auth.token;
    const body = new FormData();
    // FIXME(jdm): The backend is expecting a single file to be uploaded.
    body.append( 'file', files[0] );

    return fetch( STORYSHOP_API_URI + '/api/upload', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
      body
    })
    .then( res => {
      return res.json();
    })
    .then( pv => {
      return model.set( ...pv ).then( () => this._selectFile( $ref( pv[ 1 ].path ) ) );
    })
    ;
  },

  render () {
    const {
      onRequestClose = () => true,
      open = false,
    } = this.props;

    const styles = {
      dropzone: {
        minHeight: 250,
        height: '100%',
      },
    };

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={onRequestClose}
      />,
    ];

    return (
      <Dialog
        title="Pick a File"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={onRequestClose}
      >
        <FromComputer
          style={styles.dropzone}
          onDrop={files => this._upload( files )}
        />
      </Dialog>
    );
  },
});

