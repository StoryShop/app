import uiStore from 'stores/ui';
import { setTheme } from 'stores/actions/meta';
import characterListRoute from './list/route';
import characterRoute from 'routes/characters/one/route';

export default {
  path: 'characters',
  indexRoute: characterListRoute,
  onEnter: () => {
    uiStore.dispatch( setTheme( 'characters' ) );
  },
  childRoutes: [
    characterRoute,
  ],
};
