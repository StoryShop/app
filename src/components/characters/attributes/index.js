import React from 'react';
import reactStamp from 'react-stamp';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withModel from 'behaviours/with-model';
import withPagination from 'behaviours/with-pagination';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';

export default reactStamp( React ).compose({
  displayName: 'CharacterAttributes',

  propTypes: {
    id: React.PropTypes.string.isRequired,
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
    return [
      [ 'charactersById', character_id, 'attributes', pagination ],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      attributes: data.charactersById[ this.props.id ].attributes,
    };
  },

  componentWillReceiveProps ( newProps ) {
    if ( this.props.id !== newProps.id ) {
      this.setState({ character_id: newProps.id }, () => this.modelRefetch() );
    }
  },

  _onChangeAttribute ( idx, key, value ) {
    this.modelSetValue([
      'charactersById',
      this.props.id,
      'attributes',
      idx
    ], { $type: 'atom', value: [ key, value ] } );
  },

  render () {
    if ( this.state.loading ) {
      return null;
    }

    const styles = {
      container: {
        padding: '16px',
        ...this.props.style,
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

    const rows = Object.getOwnPropertyNames( this.state.attributes )
      .filter( k => k.match( /^\d+$/ ) )
      .map( k => ({ idx: k, attr: this.state.attributes[ k ] }) )
      .map( ({ idx, attr }) => (
        <FlexLayout direction="column" key={idx} style={styles.row}>
          <InlineEdit
            style={styles.key}
            value={attr[0]}
            onChange={val => this._onChangeAttribute( idx, val, attr[1])}
          />

          <InlineEdit
            style={styles.value}
            value={attr[1]}
            onChange={val => this._onChangeAttribute( idx, attr[0], val)}
          />
        </FlexLayout>
      ))
      ;

    const numLoaded = this.state.pagination.to - this.state.pagination.from + 1;
    const loadMoreCount = this.props.count - numLoaded;

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

        <FlexLayout style={styles.footer}>
          <span flex></span>

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

