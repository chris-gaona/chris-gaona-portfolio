'use strict';

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  created_on: {
    type: Date
  },
  link: String,
  github_link: String,
  comments: String,
  grade: String
});

mongoose.model('Project', ProjectSchema);
