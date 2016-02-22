import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const historyStore = useRouterHistory(createBrowserHistory)({ queryKey: false });

export default historyStore;

