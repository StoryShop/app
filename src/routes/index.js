import App from '../components/app';
import Home from './home';
import worlds from './worlds';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Home,
  },
  childRoutes: [
    worlds,
  ],
};

