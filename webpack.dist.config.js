var path = require('path');
var webpack = require('webpack');

module.exports = {
  // devtool: 'eval',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "/js/"
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?optional[]=runtime&stage=0'],
      include: path.join(__dirname, 'src')
    }]
  }
};
