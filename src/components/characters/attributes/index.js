import React from 'react';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';

const Attributes = ({ id, attributes, count, style, onChange }) => {
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
  ))
  ;

  return (
    <FlexLayout
      element={<Paper style={styles.container} />}
      direction="column"
    >

    <h2 style={{marginTop: 0}}>
      Attributes
    </h2>

    <FlexLayout direction="column" flex style={styles.rows}>
      {rows}
    </FlexLayout>
  </FlexLayout>
  );
};

Attributes.modelPaths = function ( conf ) {
  const { pagination } = conf;

  return [
    [ 'attributes', pagination ],
  ];
}

export default Attributes;

