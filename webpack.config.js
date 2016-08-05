var webpack = require('webpack'),
       path = require('path');

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
          'angularjs-datepicker'
        ]
    },
    output: {
        path: __dirname + '/public/scripts',
        filename: 'portfolio.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};
