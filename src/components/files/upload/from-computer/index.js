import React from 'react';
import reactStamp from 'react-stamp';
import DropZone from 'react-dropzone';
import { Model } from 'falcor';
import store from 'stores/ui';
import model from 'stores/model';
import isImage from 'utils/is-image';

const $ref = Model.ref;

export default reactStamp( React ).compose({
  statics: {
    propTypes: {
      onUpload: React.PropTypes.func.isRequired,
    },
  },

  _upload ( files ) {
    // FIXME(jdm): The backend is expecting a single file to be uploaded.
    const [ file ] = files;

    if ( ! isImage( file.type ) ) {
      console.log( 'FIXME(jdm): not an image toast' );
      return;
    }

    const jwt = store.getState().auth.token;
    const body = new FormData();
    body.append( 'file', file );

    return fetch( STORYSHOP_API_URI + '/api/upload', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
      body
    })
    .then( res => {
      if ( res.status < 200 || res.status >= 300 ) {
        const err = new Error( res.statusText );
        error.response = res;
        throw err;
      }

      return res.json();
    })
    .then( pv => {
      return model.set( ...pv ).then( () => this.props.onUpload( $ref( pv[ 1 ].path ) ) );
    })
    .catch( err => {
      console.log( 'Error uploading file:', err );
    })
    ;
  },

  upload () {
    this.refs.dropzone.open();
  },

  render () {
    const {
      style,
      disableClick = false,

      children,
        ...props
    } = this.props;

    const styles = {
      dropzone: {
        width: '100%',

        ...style
      },

      content: {
        margin: 'auto',
      },
    };

    if ( ! children ) {
      styles.dropzone = {
        ...styles.dropzone,

        border: '1px dashed #666',
        borderRadius: 5,
      };
    }

    return (
      <DropZone
        ref="dropzone"
        onDrop={files => this._upload( files )}
        disableClick={disableClick}
        style={styles.dropzone}
        >
        <div style={styles.content}>
          { children ? children : 'Drop files here to upload.' }
        </div>
      </DropZone>
    );
  }
});

