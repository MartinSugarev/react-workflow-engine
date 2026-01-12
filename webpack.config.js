const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: 'eval-cheap-source-map',
  resolve: {
  extensions: ['.ts', '.tsx', '.js', '.jsx']
 },
  entry: {
    app: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
        {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',       
        ['@babel/preset-react', { runtime: 'automatic' }],     
        '@babel/preset-typescript' 
      ]
    }
  }
},

         {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
         }
    ]
  },
  optimization: {
  splitChunks: {
    cacheGroups: {
      myapp: {
        test: /[\\/]node_modules[\\/]/,
        name: 'myapp',
        chunks: 'all'
      }
    }
  }
},
    devServer: {
    static: path.resolve(__dirname, "public"),
    port: 3000,
    open: true,
    hot: true
  },
    plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: true
    })
  ]
};