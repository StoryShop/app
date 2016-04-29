import React from 'react';
import reactStamp from 'react-stamp';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import PlayIcon from 'material-ui/lib/svg-icons/av/skip-next';
import * as colours from 'material-ui/lib/styles/colors';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';

const Dna = ({ genes }) => {
  const styles = {
    container: {
      padding: '16px',
    },

    header: {
      marginBottom: '16px',
    },

    rows: {
      marginBottom: '8px',
    },

    row: {
      margin: '0 0 16px 0',
    },

    gene: {
      marginBottom: 0,
      color: '#999',
      fontSize: '0.85em',
    },

    allele: {
    },

    footer: {
    },
  };

  const rows = Object.getOwnPropertyNames( genes )
    .filter( k => k.match( /^\d+$/ ) )
    .sort()
    .reverse()
    .map( k => ({ idx: k, gene: genes[ k ] }) )
    .map( ({ idx, gene }) => (
      <div key={idx} style={styles.row} direction="column">
        <InlineEdit
          style={styles.gene}
          flex="40"
          value={gene.gene}
          onChange={val => this._onChangeGene( idx, gene, 'gene', val )}
        />

        <InlineEdit
          style={styles.allele}
          flex="60"
          value={gene.allele}
          onChange={val => this._onChangeGene( idx, gene, 'allele', val )}
        />
      </div>
    ))
    ;

  return (
    <FlexLayout
      element={<Paper style={styles.container} />}
      direction="column"
      >

      <FlexLayout style={styles.header}>
        <h2 style={{ margin: 0, lineHeight: '48px' }}>
          Character DNA
        </h2>

        <span flex />

        <IconButton>
          <PlayIcon />
        </IconButton>
        <IconButton>
          <AddIcon />
        </IconButton>
      </FlexLayout>

      <FlexLayout direction="column" flex style={styles.rows}>
        {rows}
      </FlexLayout>
    </FlexLayout>
  );
};


Dna.modelPaths = function ( conf ) {
  const { pagination } = conf;

  return [
    [ 'genes', pagination, [ 'gene', 'allele' ] ],
  ];
}

export default Dna;

