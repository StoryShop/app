var webpack = require( 'webpack' );

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/build',
    filename: 'app.js',
  },

  target: "web",

  // "externals": {
  //   "react": "React",
  //   "react-dom": "ReactDOM",
  //   "react-router": "ReactRouter",
  //   "history": "History",
  // },

  // resolve: {
  //   root: [
  //     path.resolve( './src' ),
  //   ],
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: [ 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0' ],
      },
    ],
  },
};

