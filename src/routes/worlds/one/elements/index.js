import uiStore from 'stores/ui';
import { setTheme } from 'stores/actions/meta';
import elementListRoute from './list/route';
// import elementRoute from './one/route';

export default {
  path: 'elements',
  indexRoute: elementListRoute,
  onEnter: () => {
    uiStore.dispatch( setTheme( 'elements' ) );
  },
  childRoutes: [
    // elementRoute,
  ],
};

