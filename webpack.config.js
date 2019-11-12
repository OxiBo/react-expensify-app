const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /.s?css$/, // question mark makes it test for .scss and .css files
                use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader'
                ]
            },

            
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};

// to get new class syntax install https://www.npmjs.com/package/babel-plugin-transform-class-properties
