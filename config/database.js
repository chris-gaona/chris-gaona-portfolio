(function() {
  'use strict';

  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/portfolio', function(err) {
    if (err) {
      console.log('Failed connecting to Mongodb!');
    } else {
      // seed database
      // require('../seed');
      console.log('Successfully connected to Mongodb!');
    }
  });

})();
