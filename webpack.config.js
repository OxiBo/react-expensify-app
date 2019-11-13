const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = env => {
  // console.log("env:", env)
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css");

  return {
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          // test: /.s?css$/, // question mark makes it test for .scss and .css files
          // use: ["style-loader", "css-loader", "sass-loader"]

          test: /.s?css$/, // question mark makes it test for .scss and .css files
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              }, //was 'css-loader',
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              } // was 'sass-loader'
            ]
          })
        }
      ]
    },
    plugins: [CSSExtract],
    devtool: isProduction ? "source-map" : "inline-source-map", // devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};

// to get new class syntax install https://www.npmjs.com/package/babel-plugin-transform-class-properties

// {
//     test: /.s?css$/, // question mark makes it test for .scss and .css files
//     use: ["style-loader", "css-loader", "sass-loader"]
//   }
