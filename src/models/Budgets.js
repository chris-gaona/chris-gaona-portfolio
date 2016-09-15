'use strict';

var mongoose = require('mongoose');

var BudgetSchema = new mongoose.Schema({
  start_period: {
    type: Date
  },
  end_period: {
    type: Date
  },
  current_cash: {
    type: Number
  },
  existing_cash: {
    type: Number
  },
  total_cash: {
    type: Number
  },
  actual_spent: {
    type: Number
  },
  actual_saving: {
    type: Number
  },
  actual_ending_cash: {
    type: Number
  },
  budget_items: [
    {
      item: String,
      projection: Number,
      actual: [
        {
          name: String,
          amount: Number
        }
      ]
    }
  ]
});

mongoose.model('Budget', BudgetSchema);
