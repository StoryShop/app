import { model } from 'stores/model';
import historyStore from 'stores/history';
import Logger from 'utils/logger';

const log = Logger( 'withLocationPersistence' );

export default {
  componentDidMount () {
    /**
     * Listen to the history, which will immediately invoke the callback with a path object. Then
     * immediately destroy the listener.
     */
    historyStore.listen( path => {
      model.setValue( [ 'currentUser', 'ux', 'lastVisited' ], path.pathname ).subscribe(
        path => log.debug( `Saved path ${path}` ),
        err => log.error( 'Error Setting Path Value:', err )
      );
    })();
  },
};

