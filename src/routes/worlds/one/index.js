import WorldSettings from './settings';
import elements from './elements';
import characters from './characters';
import outlines from './outlines';

export const World = ({ children }) => ( children );

export default {
  path: ':id',
  component: World,
  indexRoute: {
    component: WorldSettings,
  },
  childRoutes: [
    elements,
    outlines,
    characters,
  ],
};

