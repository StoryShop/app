import uiStore from 'stores/ui';
import { setTheme } from 'stores/actions/meta';
import outlineListRoute from './list/route';
import outlineRoute from './one/route';

export default {
  path: 'outlines',
  indexRoute: outlineListRoute,
  onEnter: () => {
    uiStore.dispatch( setTheme( 'outlines' ) );
  },
  childRoutes: [
    outlineRoute,
  ],
};

