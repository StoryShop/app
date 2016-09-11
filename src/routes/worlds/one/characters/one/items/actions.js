export default function ( model ) {
  return {
    setName ( id, name ) {
      model.setValue([ 'itemsById', id, 'name' ], name );
    },
  };
}

