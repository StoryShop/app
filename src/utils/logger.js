import debug from 'debug';

export default ( name ) => ({
  _debug: debug( `StoryShop:${name}:debug` ),
  _warn: debug( `StoryShop:${name}:warn` ),
  _error: debug( `StoryShop:${name}:error` ),

  debug ( ...args ) {
    return this._debug( ...args );
  },

  warn ( ...args ) {
    return this._warn( ...args );
  },

  error ( ...args ) {
    return this._error( ...args );
  },
});

