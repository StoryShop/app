export default model => ({
  setTitle ( id, title ) {
    model.setValue([ 'elementsById', id, 'title' ], title );
  },

  setContent ( id, raw ) {
    model.setValue([ 'elementsById', id, 'content' ], raw );
  },

  deleteElement ( world_id, id ) {
    model.call([ 'worldsById', world_id, 'elements', 'delete' ], [ id ] );
  },
});

