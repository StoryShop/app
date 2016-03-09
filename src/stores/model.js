import falcor, { Model } from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import Logger from 'utils/logger';

const log = Logger( 'ModelStore' );

const store = {
  _listeners: [],
  _localModel: null,

  subscribe ( cb ) {
    this._listeners.push( cb );

    return () => this._listeners = this._listeners.filter( l => l !== cb );
  },

  onNext () {
    log.debug( 'Model updated' );
    this._listeners.forEach( cb => cb() );
  },

  get ( ...args ) {
    if ( ! this._localModel ) {
      this._localModel = model.withoutDataSource();
    }

    return this._localModel.get( ...args );
  },
};

/**
 * A factory to create a new instance of the model, with the provided `onChange` handler and cache.
 */
const ModelFactory = ( onChange, cache ) => new Model({
  onChange,
  cache,
  source: new HttpDataSource( 'http://localhost:9999/api/model.json' ),
});

/**
 * Create a new instance of the model
 */
export const model = ModelFactory( () => store.onNext(), {} ).batch();

/**
 * Store a copy of the model on the window object for troubleshooting.
 * FIXME: remove in production builds
 */
if ( global.window ) {
  global.window.model = model;
}

export default store;

