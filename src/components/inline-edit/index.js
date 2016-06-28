import React from 'react';
import reactStamp from 'react-stamp';
import ReactInlineEdit from 'react-inline-edit';
import * as colours from 'material-ui/lib/styles/colors';

export default reactStamp( React ).compose({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
    defaultValue: React.PropTypes.string,
    delay: React.PropTypes.number,
  },

  /**
   * Set the initial state from the props.
   */
  componentWillMount () {
    this.setState({ value: this.props.value });
  },

  /**
   * If we receive a new value throught the props, we apply it to the state.
   */
  componentWillReceiveProps ( props ) {
    this.setState({ value: props.value });
  },

  /**
   * Cancel the timeout, if it exists.
   */
  _endTimeout () {
    if ( this._changeTimeout ) {
      clearTimeout( this._changeTimeout );
      delete this._changeTimeout;
    }
  },

  /**
   * Create a new timeout using the delay from props, or 500ms if none is provided, after which we
   * can trigger the callback provided through props.
   */
  _startTimeout ( value ) {
    const delay = typeof this.props.delay === 'number' ? this.props.delay : 500;
    this._changeTimeout = setTimeout( () => this._save( value ), delay );
  },

  /**
   * When the input value changes by the user, update the state of the controlled component and
   * begin a timeout to update the model.
   */
  _onChange ( value ) {
    this.setState({ value });

    this._endTimeout();
    this._startTimeout( value );
  },

  /**
   * Persist the changes through the callback.
   */
  _save ( value ) {
    if ( this.props.onChange ) {
      this.props.onChange( value );
    }
  },

  /**
   * Ensure we clean up the timeout.
   */
  componentWillUnmount () {
    if ( this._changeTimeout ) {
      this._endTimeout();
      this._save( this.state.value );
    }
  },

  render () {
    const { value, onChange, style, ...props } = this.props;
    const textareaStyle = {
      borderStyle: 'none',
      width: '100%',
      textDecoration: `underline dashed ${colours.faintBlack}`,
      overflow: 'hidden',

      ...style
    };

    return (
      <ReactInlineEdit
        {...props}

        onChange={ev => this._onChange( ev.target.value )}
        value={this.state.value}
        style={textareaStyle}
      />
    );
  },
});

