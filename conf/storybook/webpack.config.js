var path = require( 'path' );

module.exports = {
  resolve: {
    root: [
      path.resolve( './src' ),
    ],
  },
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: [
          'style', 'css',
        ],
      },
    ],
  }
};

