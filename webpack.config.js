var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, './www'),
        filename: 'bundle.js'
            //publicPath: "http://localhost:3000/"
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react'],
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/
        }]
    }
};
