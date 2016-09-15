var resolvePath = require( 'path' ).resolve;
var glob = require( 'glob' );

const cwd = process.cwd();

require( 'babel-polyfill' );
require( 'babel-register' );

glob( '../../src/**/*scenario.js', function ( err, files ) {
  require( './setup.js' );

  files.forEach( function ( file ) {
    require( resolvePath( cwd, file ) );
  });

  require( './teardown.js' );
});

