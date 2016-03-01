import React from 'react';
import reactStamp from 'react-stamp';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import PlayIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import * as colours from 'material-ui/lib/styles/colors';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withModel from 'behaviours/with-model';
import withPagination from 'behaviours/with-pagination';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';

export default reactStamp( React ).compose({
  displayName: 'CharacterDna',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
  },

  defaultProps: {
    style: {},
  },

  state: {
    loading: true,
  },

  modelPaths () {
    const pagination = { from: this.state.pagination.from, to: this.state.pagination.to };
    const path = [ 'charactersById', this.props.id, 'genes', pagination ];
    return [
      [ ...path, 'allele' ],
      [ ...path, 'gene', 'label' ],
    ];
  },

  modelToState ( data ) {
    return {
      loading: false,
      genes: data.charactersById[ this.props.id ].genes,
    };
  },

  _onChangeGene ( idx, allele ) {
    this.modelSetValue([
      'charactersById',
      this.props.id,
      'genes',
      idx,
      'allele',
    ], allele );
  },

  render () {
    if ( this.state.loading ) {
      return null;
    }

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
        marginBottom: '4px',
        // fontWeight: 600,
        color: '#999',
        fontSize: '0.85em',
      },

      allele: {
      },

      footer: {
      },
    };

    const rows = Object.getOwnPropertyNames( this.state.genes )
      .filter( k => k.match( /^\d+$/ ) )
      .map( k => ({ idx: k, gene: this.state.genes[ k ] }) )
      .map( ({ idx, gene }) => (
        <div key={idx} style={styles.row} direction="column">
          <div style={styles.gene} flex="40">
            {gene.gene.label}
          </div>

          <InlineEdit
            style={styles.allele}
            flex="60"
            value={gene.allele}
            onChange={val => this._onChangeGene( idx, val )}
          />
        </div>
      ))
      ;

    const numLoaded = this.state.pagination.to - this.state.pagination.from + 1;
    const loadMoreCount = this.props.count - numLoaded;

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

        <FlexLayout style={styles.footer}>
          <span flex />

          { this.state.pagination.disabled ? null : <FlatButton
            label={`Load More (${loadMoreCount})`}
            disabled={this.state.pagination.disabled}
            onClick={() => this.paginate()}
          /> }
        </FlexLayout>
      </FlexLayout>
    );
  },
}, withShallowCompare, withModel, withPagination );


