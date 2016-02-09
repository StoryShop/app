var shortid = require( 'shortid' );
var path = require( 'path' );
var fs = require( 'fs' );

/**
 * {
 *   world1: 'FHGH343'm
 * }
 */
var ids = [
  'user1',
  'world1',

  'elementBoard1',
  'element1',

  'storyBeatBoard1',
  'section1',
  'card1',

  'character1',
  'section2',
  'card2',

  'character2',

  'dcat1',
  'dnaq1',
  'dcat2',
  'dnaq2',
].reduce( function ( obj, name ) {
  obj[ name ] = shortid.generate();

  return obj;
}, {} );

fs.writeFileSync( path.join( __dirname, '..', 'ids.json' ), JSON.stringify( ids, null, 2 ) );

