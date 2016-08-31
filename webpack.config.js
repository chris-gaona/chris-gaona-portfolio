var webpack = require('webpack')

module.exports = {
    context: __dirname + '/app',
    devtool: 'source-map',
    entry: {
        app: './app.js',
        vendor: [
          'angular',
          'angular-route',
          'angular-scroll',
          'angular-animate',
          'angular-toastr',
          'angularjs-datepicker',
          'ngmap'
        ]
    },
    output: {
        path: __dirname + '/dist/public/scripts',
        filename: 'portfolio.bundle.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        ON_TEST: process.env.NODE_ENV === 'test'
      }),
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ],
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/}
      ]
    }
};
