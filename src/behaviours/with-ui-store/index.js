import invariant from 'invariant';
import Logger from 'utils/logger';
import store from 'stores/ui';

const log = Logger( 'WithUiStore' );

export default {
  dispatch ( ...args ) {
    return store.dispatch( ...args );
  },

  componentDidMount () {
    invariant(
      typeof this.mapUiState === 'function',
      'withUiStore requires a mapUiState method on the component instance.'
    );

    const updateState = () => {
      const data = store.getState();
      log.debug( 'Received data from store:', data );
      this.setState( this.mapUiState( data ) );
    };

    this.unsubscribeUiStore = store.subscribe( updateState );
    updateState();
  },

  componentWillUnmount () {
    this.unsubscribeUiStore();
  },
};

