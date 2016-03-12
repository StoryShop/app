import HttpDataSource from 'falcor-http-datasource';

export default class DataSource extends HttpDataSource {
  constructor ( path, store ) {
    super( path );
    this._store = store;
  }

  onBeforeRequest ( config ) {
    const jwt = this._store.getState().auth.token;

    if ( jwt ) {
      config.headers[ 'Authorization' ] = `JWT ${jwt}`;
    }
  }
}

