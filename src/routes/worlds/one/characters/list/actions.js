export default model => ({
  addCharacter ( world_id, name ) {
    model.call([
      'worldsById',
      world_id,
      'characters',
      'push',
    ], [ name ]);
  },
});

