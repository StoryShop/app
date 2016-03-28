import React from 'react';
import reactStamp from 'react-stamp';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import PlayIcon from 'material-ui/lib/svg-icons/av/skip-next';
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

  init () {
    this.state.character_id = this.props.id;
  },

  modelPaths () {
    const character_id = this.state.character_id;
    const pagination = { from: this.state.pagination.from, to: this.state.pagination.to };
    const path = [ 'charactersById', character_id, 'genes', pagination ];
    return [
      [ ...path, [ 'gene', 'allele' ] ],
    ];
  },

  modelToState ( data ) {
    return {
      loading: false,
      genes: data.charactersById[ this.props.id ].genes,
    };
  },

  componentWillReceiveProps ( newProps ) {
    if ( this.props.id !== newProps.id ) {
      this.setState({ character_id: newProps.id }, () => this.modelRefetch() );
    }
  },

  _onChangeGene ( idx, gene, field, val ) {
    this.modelSetValue([
      'charactersById',
      this.props.id,
      'genes',
      idx
    ], { $type: 'atom', value: { ...gene, [field]: val } } );
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
        marginBottom: 0,
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


