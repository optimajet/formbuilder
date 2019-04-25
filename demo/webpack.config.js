var webpack = require('webpack');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

var config = {
    // TODO: Add common Configuration
    module: {},
    plugins: [new HardSourceWebpackPlugin()]
};

var viewerConfig = Object.assign({}, config, {
  name: "app",
  entry:  "./formbuilderdev-viewer.js",

output: {
  filename: "formbuilderdev-viewer.js",
  path: __dirname + "/build",
},

module: {
  loaders: [
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['env', 'stage-2', 'react']
      }
    },
    {
      test: /\.scss$/,
      loader: "style-loader!css-loader!sass-loader"
    }
  ]
},
resolve: {
  extensions: ['*', '.js', '.json', '.jsx', '.css', '.scss']
}
});

var builderConfig = Object.assign({}, config, {
  name: "app",
  entry:  "./formbuilderdev-builder.js",

output: {
  filename: "formbuilderdev-builder.js",
  path: __dirname + "/build",
},

module: {
  loaders: [
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['env', 'stage-2', 'react']
      }
    },
    {
      test: /\.scss$/,
      loader: "style-loader!css-loader!sass-loader"
    }
  ]
},
resolve: {
  extensions: ['*', '.js', '.json', '.jsx', '.css', '.scss']
}
});

module.exports = [viewerConfig, builderConfig];