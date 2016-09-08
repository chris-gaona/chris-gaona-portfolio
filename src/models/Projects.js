'use strict';

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  category: {
    type: Array
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
  grade: String,
  likes: {
    type: Number,
    default: 0
  }
});

ProjectSchema.path('category').validate(function(category){
  if (!category) {
    return false;
  } else if (category.length === 0) {
    return false;
  }
  return true;
}, 'Category is required');

mongoose.model('Project', ProjectSchema);
