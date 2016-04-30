import React from 'react';
import reactStamp from 'react-stamp';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

export default reactStamp( React ).compose({
  init ( props ) {
    this.state = {
      open: props.open,
      value: '',
    };
  },

  componentWillReceiveProps ( newProps ) {
    this.setState({ open: newProps.open });
  },

  _onOpen () {
    this.setState({ open: true });
  },

  _onClose () {
    this.setState({
      open: false,
      value: '',
    });

    this.props.onClose();
  },

  _onSubmit () {
    this.props.setValue( this.state.value );
    this._onClose();
  },

  _onChange ( value ) {
    this.setState({ value });
  },

  render () {
    const {
      okLabel = 'Ok',
      title,
      label,
    } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={e=>this._onClose()}
      />,

      <FlatButton
        label={okLabel}
        primary={true}
        keyboardFocused={true}
        disabled={this.state.value.length === 0}
        onTouchTap={e=>this._onSubmit()}
      />,
    ];

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={e=>this._onClose()}
      >
        <TextField
          value={this.state.value}
          autoFocus
          onChange={e=>this._onChange( e.target.value )}
          floatingLabelText={label}
        />
      </Dialog>
    );
  },
});

