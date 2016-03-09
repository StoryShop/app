var webpack = require( 'webpack' );
var path = require( 'path' );

var shared = {
  context: __dirname + '/src',

  resolve: {
    root: [
      path.resolve( './src' ),
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: [ 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0' ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};

module.exports = [
  Object.assign( {}, shared, {
    entry: './index.js',
    devtool: 'inline-source-map',

    output: {
      path: __dirname + '/build',
      publicPath: '/assets/',
      filename: 'app.js',
    },

    target: "web",

    node: {
      fs: "empty"
    },

    // "externals": {
    //   "react": "React",
    //   "react-dom": "ReactDOM",
    //   "react-router": "ReactRouter",
    //   "history": "History",
    // },
  }),

  Object.assign( {}, shared, {
    entry: './specs.js',
    devtool: 'eval',

    target: 'node',

    plugins: [
      new webpack.IgnorePlugin( /ReactContext/ ),
    ],

    output: {
      path: __dirname + '/build',
      filename: 'specs.js',
    },
  }),
];

