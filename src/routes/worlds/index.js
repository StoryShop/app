import one from './one';

export const World = ({ children }) => ( children );

export default {
  path: '/worlds',
  component: World,
  childRoutes: [
    one,
  ],
};

