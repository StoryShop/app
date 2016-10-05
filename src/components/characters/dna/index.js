import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import TrashIcon from 'material-ui/lib/svg-icons/action/delete';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import PlayIcon from 'material-ui/lib/svg-icons/av/skip-next';
import * as colours from 'material-ui/lib/styles/colors';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';

export default class Dna extends React.Component {
  constructor  (props) {
    super();
    this.state = {
      newGene: props.randomGene,
      adding: true,
      hover: {}
    };
  };

  _add () {
    this.setState({ adding: true, newGene: { gene: '', allele: '' } });
  };

  _onNewBlur ( newGene ) {
    if ( newGene.allele && newGene.allele !== '' ) {
      this.props.addGene( this.props.id, newGene );
    }
  };

  componentWillReceiveProps ( newProps ) {
    this.setState({
      adding: newProps.genes.length === this.props.genes.length,
      newGene: newProps.randomGene,
    });
  };

  render () {
    const {
      id,
      genes,
      changeGene,
      getRandomGene,
    } = this.props;

    const {
      newGene,
    } = this.state;

    const styles = {
      container: {
        padding: '16px',
      },

      header: {
        marginBottom: '16px',
      },

      rows: {
        marginBottom: '8px'
      },

      row: {
        margin: '0 0 16px 0',
        position: 'relative'
      },

      gene: {
        marginBottom: 0,
        color: '#999',
        fontSize: '0.85em',
        paddingRight: 48
      },

      allele: {
        paddingRight: 48
      },

      footer: {
      },

      remove: {
        position: 'absolute',
        top: 0,
        right: 0,
        cursor: 'pointer',
        opacity: 0,
        transition: 'opacity 200ms ease-in'
      }
    };

    styles.newRow = {
      ...styles.row,
      border: '1px dashed #ccc',
      padding: 5,
    };

    const rows = Object.getOwnPropertyNames( genes )
      .filter( k => k.match( /^\d+$/ ) )
      .map( k => parseInt( k, 10 ) )
      .sort()
      .reverse()
      .map( k => ({ idx: k, gene: genes[ k ] }) )
      .map( ({ idx, gene }) => {
        let style = Object.assign({}, styles.remove);
        style.opacity = this.state.hover[gene.id] ? 1 : 0;
        return <div key={idx} style={styles.row} className="dna-wrapper" direction="column" onMouseOver={this.onRowHover.bind(this, gene, true)} onMouseOut={this.onRowHover.bind(this, gene, false)}>
          <InlineEdit
            style={styles.gene}
            flex="40"
            value={gene.gene}
            onChange={val => changeGene( id, idx, gene, 'gene', val )}
          />

          <InlineEdit
            style={styles.allele}
            flex="60"
            value={gene.allele}
            onChange={val => changeGene( id, idx, gene, 'allele', val )}
          />

          <IconButton
            style={style}
            onClick={this.deleteGene.bind(this, idx, gene)}>
            <TrashIcon />
          </IconButton>
        </div>
      });

    const newRow = (
      <div key={rows.length} style={styles.newRow} direction="column">
        <InlineEdit
          ref="newGene"
          flex="40"
          style={styles.gene}
          value={newGene.gene}
          placeholder='Question'
          onChange={val => this.setState({ newGene: { ...newGene, gene: val } })}
        />

        <InlineEdit
          ref="newAllele"
          flex="60"
          style={styles.allele}
          value={newGene.allele}
          placeholder='Answer'
          onChange={val => this.setState({ newGene: { ...newGene, allele: val } })}
          onBlur={e => this._onNewBlur( newGene )}
        />
      </div>
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
            Character DNA
          </h2>

          <span flex />

          <IconButton onClick={e => getRandomGene()}>
            <PlayIcon />
          </IconButton>
          <IconButton onClick={e => this._add()}>
            <AddIcon />
          </IconButton>
        </FlexLayout>

        <FlexLayout direction="column" flex style={styles.rows}>
          {rows}
        </FlexLayout>
      </FlexLayout>
    );
  };

  statics = {
    modelPaths ( conf ) {
      const { prefix, pagination } = conf;

      return [
        [ ...prefix, 'genes', pagination, [ 'gene', 'allele' ] ],
        [ 'genes', 'random' ],
      ];
    },
  };

  onRowHover(gene, isHover) {
    let hover = this.state.hover;
    hover[gene.id] = isHover;
    this.setState({
      hover: hover
    });
  };

  deleteGene(idx, gene) {
    this.props.deleteGene(idx, gene);
  };
};
