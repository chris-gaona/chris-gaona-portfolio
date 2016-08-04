'use strict';

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  created_on: {
    type: Date,
    required: [true, 'Created on date is required']
  },
  link: String,
  github_link: {
    type: String,
    required: [true, 'Repository link is required']
  },
  comments: String,
  treehouse_comments: String,
  grade: String
});

mongoose.model('Project', ProjectSchema);
