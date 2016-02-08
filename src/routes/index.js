import App from '../components/app';
import { Home } from './home';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Home,
  },
  childRoutes: [
  ],
};

