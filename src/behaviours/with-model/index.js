import React from 'react';
import store, { model } from 'stores/model';
import Logger from 'utils/logger';

const log = Logger( 'WithModel' );

export default {
  modelSet ( ...args ) {
    model.set( ...args ).subscribe(
      res => log.debug( 'modelSet success', res ),
      res => log.error( 'modelSet error', res )
    );
  },

  modelSetValue ( ...args ) {
    model.setValue( ...args ).subscribe(
      res => log.debug( 'setValue success', res ),
      res => log.error( 'setValue error', res )
    );
  },

  _onModelChangeSuccess ( data, type ) {
    log.debug( `onChange from ${type}`, data );

    if ( ! data ) {
      log.warn( 'No data returned for paths', this.modelPaths() );
      return;
    }

    this.setState( this.modelToState( data.json ) );
  },

  _onModelChangeError ( err ) {
    log.error( 'onChange Error', err );
  },

  _onModelChange () {
    store.get( ...this.modelPaths() ).then(
      data => this._onModelChangeSuccess( data, 'change' ),
      err => this._onModelChangeError( err )
    );
  },

  componentDidMount () {
    if ( ! this.modelPaths ) {
      return log.warn( 'No model paths specified. Skipping...' );
    }

    this._modelStoreListener = store.subscribe( () => this._onModelChange() );

    /**
     * For initial data, we must manually call the callbacks rather than waiting for a change of the
     * model; if all data is cached, there is no model change and the data will never get to the
     * component. For initial render of components that need non-cached data, the callback will be
     * called twice, though the render should only happen once.
     */
    log.debug( 'Fetching initial data' );
    model.get( ...this.modelPaths() ).subscribe(
      data => this._onModelChangeSuccess( data, 'initial' ),
      err => this._onModelChangeError( err )
    );
  },

  modelRefetch () {
    model.get( ...this.modelPaths() ).subscribe(
      data => this._onModelChangeSuccess( data, 'refresh' ),
      err => this._onModelChangeError( err )
    );
  },

  componentWillUnmount () {
    this._modelStoreListener();
  },
};

