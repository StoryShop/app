import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import thunk from 'redux-thunk';
import meta from './reducers/meta';
import auth from './reducers/auth';
import Logger from 'utils/logger';

const log = Logger( 'uiStore' );
const storageKey = 'storyshop-ui-store'

const reducers = storage.reducer( combineReducers({
  routing: routerReducer,
  meta,
  auth,
}));

const storageEngine = createEngine( storageKey );
const storageMiddleware = storage.createMiddleware( storageEngine );

let seed;

if ( global.window && global.window.localStorage ) {
  seed = JSON.parse( global.window.localStorage.getItem( storageKey ) );
}

if ( ! seed ) {
  seed = {};
}

const store = createStore(
  reducers,
  seed,
  compose(
    applyMiddleware( thunk, storageMiddleware ),
    global.window && global.window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// FIXME(jdm): For some reason, this canonical way creates a race condition where actions are fired before the
// storage is read, causing the items in localstorage to be overwritten. Instead, I've set the
// initial state manually, above.
// storage.createLoader( storageEngine )( store );

store.subscribe( () => log.debug( 'Store updated.', store.getState() ) );

/**
 * Store a copy of the store on the window object for troubleshooting.
 * FIXME: remove in production builds
 */
if ( global.window ) {
  global.window.store = store;
}


export default store;

