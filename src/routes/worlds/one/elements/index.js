import uiStore from 'stores/ui';
import { setTheme } from 'stores/actions/meta';
import elementListRoute from './list/route';

export default {
  path: 'elements(/:id)',
  indexRoute: elementListRoute,
  onEnter: () => {
    uiStore.dispatch( setTheme( 'elements' ) );
  },
};

