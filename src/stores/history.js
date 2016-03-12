import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import uiStore from 'stores/ui';

const historyStore = syncHistoryWithStore( useRouterHistory(createBrowserHistory)({ queryKey: false }), uiStore );

export default historyStore;

