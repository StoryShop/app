import { createStore, combineReducers } from 'redux';
import meta from './reducers/meta';
import Logger from 'utils/logger';

const log = Logger( 'uiStore' );

const reducers = combineReducers({
  meta,
});

const store = createStore( reducers );

store.subscribe( () => log.debug( 'Store updated.', store.getState() ) );

export default store;

