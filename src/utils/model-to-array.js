export default ( json ) => Object.keys( json )
  .filter( k => k !== '$__path' && k !== 'length' )
  ;

