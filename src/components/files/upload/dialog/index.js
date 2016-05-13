import React from 'react';
import reactStamp from 'react-stamp';
import fetchPolyfill from 'whatwg-fetch';
import { Model } from 'falcor';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FromComputer from 'components/files/upload/from-computer';

const $ref = Model.ref;

export default reactStamp( React ).compose({
  static: {
    propTypes: {
      onSelect: React.PropTypes.func.isRequired,
    },
  },

  init ( props ) {
    this.state = {
      open: false,
    };
  },

  render () {
    const {
      onRequestClose = () => true,
      onSelect,
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
          onUpload={onSelect}
        />
      </Dialog>
    );
  },
});

