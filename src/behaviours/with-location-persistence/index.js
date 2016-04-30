import { model } from 'stores/model';
import historyStore from 'stores/history';
import Logger from 'utils/logger';
import { Model } from 'falcor';

const log = Logger( 'withLocationPersistence' );

export default {
  // componentDidMount () {
  //   /**
  //    * Listen to the history, which will immediately invoke the callback with a path object. Then
  //    * immediately destroy the listener.
  //    */
  //   historyStore.listen( path => {
  //     model.get([ 'currentUser', 'ux', 'lastVisited' ]).subscribe( jsonEnv => {
  //       const userModel = model.deref( jsonEnv.json.currentUser.ux );
  //       userModel.setValue( [ 'lastVisited' ], path.pathname ).subscribe(
  //         path => log.debug( 'Saved path', path ),
  //         err => log.error( 'Error Setting Path Value:', err )
  //       );
  //     })
  //   })();
  // },
};

