var express = require( 'express' );

var app = express();

app.use( '/assets', express.static( __dirname + '/build' ) );

app.get( '*', function ( req, res ) {
  res.sendFile( __dirname + '/index.html' );
});

app.listen( 8888 );

