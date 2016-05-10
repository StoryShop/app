export default model => ({
  setTitle ( id, title ) {
    model.setValue([ 'elementsById', id, 'title' ], title );
  },

  setContent ( id, raw ) {
    model.setValue([ 'elementsById', id, 'content' ], raw );
  },

  setCover ( id, ref ) {
    model.call([ 'elementsById', id, 'cover' ], [ ref ], [ 'name', 'url' ] );
  },

  deleteElement ( world_id, id ) {
    model.call([ 'worldsById', world_id, 'elements', 'delete' ], [ id ] );
  },

  addElement ( world_id, title ) {
    model.call([
      'worldsById',
      world_id,
      'elements',
      'push'
    ], [{ title }] );
  },

  addAttachment ( id, ref ) {
    model.call([
      'elementsById',
      id,
      'files',
      'push'
    ], [ ref ], [ 'name', 'url' ] );
  },
});

