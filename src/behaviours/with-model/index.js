import React from 'react';
import model from 'stores/model';
import Logger from 'utils/logger';

const log = Logger( 'WithModel' );

export default {
  componentDidMount () {
    if ( ! this.modelPaths ) {
      return log.warn( 'No model paths specified. Skipping...' );
    }

    model.get( ...this.modelPaths() ).subscribe(
      data => {
        log.debug( 'Retreived data from model', data );
        this.setState( this.modelToState( data.json ) );
      },
      err => log.error( err )
    );
  },
};

