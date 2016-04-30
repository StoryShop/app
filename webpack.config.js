var webpack = require( 'webpack' );
var path = require( 'path' );

var dev = process.env.BUILD_ENV === 'development' ? true : false;

var shared = {
  context: __dirname + '/src',

  resolve: {
    root: [
      path.resolve( './src' ),
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      STORYSHOP_API_URI: dev ? "'http://localhost:9999'" : "'http://api.storyshopapp.com'",
    }),
  ],

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
    devtool: dev ? 'inline-source-map' : undefined,

    output: {
      path: __dirname + '/build/assets',
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

