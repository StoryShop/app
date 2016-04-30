import reactStamp from 'react-stamp';
import store, { model } from 'stores/model';
import Logger from 'utils/logger';
import { Model } from 'falcor';

const $atom = Model.atom;
const log = Logger( 'ConnectToModel' );

export default ( React, modelToProps, dispatchToProps, Component ) => reactStamp( React ).compose({
  state: {
    loading: true,
    props: {},
  },

  _onModelChange () {
    if ( this._unmounted ) return;

    this.refresh();
  },

  init () {
    const modelWrapper = {
      get ( ...args ) {
        return model.get( ...args ).then(
          res => {
            log.debug( 'get success', res );
            return res;
          },
          err => log.error( 'get error', err )
        );
      },

      set ( ...args ) {
        model.set( ...args ).subscribe(
          res => log.debug( 'set success', res ),
          err => log.error( 'set error', err )
        );
      },

      setValue ( path, val ) {
        if ( typeof val === 'object' ) {
          val = $atom( val );
        }

        model.setValue( path, val ).subscribe(
          res => log.debug( 'setValue success', res ),
          err => log.error( 'setValue error', err )
        );
      },

      call ( ...args ) {
        model.call( ...args ).subscribe(
          res => log.debug( 'call success', res ),
          err => log.error( 'call error', err )
        );
      },
    };

    this.state = {
      ...this.state,
      actions: dispatchToProps( modelWrapper ),
    };
  },

  refresh ( props ) {
    modelToProps( model, props || this.props )
    .subscribe( props => this.setState({ loading: false, props }));
  },

  componentDidMount () {
    this._modelStoreListener = store.subscribe( () => this._onModelChange() );
    this.refresh();
  },

  componentWillReceiveProps ( newProps ) {
    this.setState({ loading: true });
    this.refresh( newProps );
  },

  componentWillUnmount () {
    this._unmounted = true;

    if ( this._modelStoreListener() ) {
      this._modelStoreListener();
    }
  },

  render () {
    if ( this.state.loading ) {
      // TODO: replace with loader
      return null;
    }

    return <Component {...this.props} {...this.state.props} {...this.state.actions} />;
  },
});

