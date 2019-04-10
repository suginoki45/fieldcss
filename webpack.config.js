const yargs = require('yargs');
const PRODUCTION = yargs.argv.prod;

module.exports = {
  entry: './src/js/bundle.js',
  output: {
    path: `${__dirname}/dist/js`,
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: []
          }
        }
      }
    ]
  },
  mode: PRODUCTION ? 'production' : 'development',
  devServer: {
    contentBase: './',
    open: true
  },
  devtool: ! PRODUCTION ? 'inline-source-map' : false
};
