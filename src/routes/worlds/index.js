import one from './one';

export const World = ({ children }) => ( children );

export default {
  path: '',
  component: World,
  childRoutes: [
    one,
  ],
};
