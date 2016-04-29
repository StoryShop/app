import { useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import uiStore from 'stores/ui';

const historyStore = syncHistoryWithStore( useRouterHistory(createHashHistory)({ queryKey: false }), uiStore );

export default historyStore;

