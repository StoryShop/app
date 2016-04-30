export default function ( model ) {
  return {
    setName ( id, name ) {
      model.setValue([ 'charactersById', id, 'name' ], name );
    },

    setAliases ( is, alias ) {
      let aliases = [];

      if ( alias !== '' ) {
        aliases = alias.split( ',' ).map( a => a.trim() );
      }

      model.setValue([ 'charactersById', id, 'aliases' ], aliases );
    },

    setOutline ( id, raw, editorState ) {
      model.setValue([ 'charactersById', id, 'content' ], raw );
    },

    changeAttribute ( id, idx, key, value ) {
      model.setValue([
        'charactersById',
        id,
        'attributes',
        idx
      ], [ key, value ] );
    },

    addAttribute ( id, attribute ) {
      model.call([
        'charactersById',
        id,
        'attributes',
        'push'
      ], [ attribute ] );
    },

    createRelationship ( _id, rel_id, description ) {
      model.call([
        'charactersById',
        _id,
        'relationships',
        'push'
      ], [ rel_id, description ] );
    },

    changeGene ( _id, idx, gene, field, val ) {
      model.setValue([
        'charactersById',
        _id,
        'genes',
        idx
      ], { ...gene, [field]: val } );
    },

    addGene ( _id, gene ) {
      model.call([
        'charactersById',
        _id,
        'genes',
        'push'
      ], [ gene ] );
    },

    getRandomGene ( _id, gene ) {
      model.get([ 'genes', 'random' ]);
    },
  };
}

