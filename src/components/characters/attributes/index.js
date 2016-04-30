import React from 'react';
import reactStamp from 'react-stamp';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';

export default reactStamp( React ).compose({
  state: {
    newAttribute: [],
  },

  _add () {
    this.setState({ adding: true, newAttribute: [ '', '' ] });
  },

  _onNewKeyBlur ( val ) {
    if ( val && val !== '' ) {
      this.props.addAttribute( this.props.id, [ val, '' ] );
    }

    return this.setState({ adding: false });
  },

  render () {
    const { id, attributes, count, style, onChange } = this.props;
    const styles = {
      container: {
        padding: '16px',
        ...style,
      },

      key: {
        color: '#999',
        fontSize: '12px',
      },

      value: {
        //
      },

      rows: {
        marginBottom: '8px',
      },

      row: {
        margin: '5px 0',
      },

      footer: {
      },
    };

    const attrs = Object.getOwnPropertyNames( attributes )
      .filter( k => k.match( /^\d+$/ ) )
      .sort()
      .reverse()
      .map( k => ({ idx: k, attr: attributes[ k ] }) )
      ;

    const rows = attrs.map( ({ idx, attr }) => (
      <FlexLayout direction="column" key={idx} style={styles.row}>
        <InlineEdit
          style={styles.key}
          value={attr[0]}
          onChange={val => onChange( idx, val, attr[1])}
        />

        <InlineEdit
          style={styles.value}
          value={attr[1]}
          onChange={val => onChange( idx, attr[0], val)}
        />
      </FlexLayout>
    ));

    const newRow = (
      <FlexLayout key={rows.length} direction="column" style={styles.row}>
        <InlineEdit
          style={styles.key}
          value={this.state.newAttribute[0]}
          placeholder='key'
          autoFocus
          onBlur={e => this._onNewKeyBlur( e.target.value )}
          onChange={val => this.setState({ newAttribute: [ val, this.state.newAttribute[1] ] })}
        />

        <InlineEdit
          style={styles.value}
          placeholder='value'
          onChange={val => this.setState({ newAttribute: [ this.state.newAttribute[0], val ] })}
        />
      </FlexLayout>
    );

    if ( this.state.adding ) {
      rows.unshift( newRow );
    }

    return (
      <FlexLayout
        element={<Paper style={styles.container} />}
        direction="column"
      >
        <FlexLayout style={styles.header}>
          <h2 style={{ margin: 0, lineHeight: '48px' }}>
            Attributes
          </h2>

          <span flex></span>

          <IconButton onClick={e => this._add()}>
            <AddIcon />
          </IconButton>
        </FlexLayout>

        <FlexLayout direction="column" flex style={styles.rows}>
          { rows }
        </FlexLayout>
      </FlexLayout>
    );
  },

  statics: {
    modelPaths ( conf ) {
      const { pagination } = conf;

      return [
        [ 'attributes', pagination ],
      ];
    },
  },
});

