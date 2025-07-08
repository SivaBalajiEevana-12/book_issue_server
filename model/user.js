const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
  stallName: {
    type: String,
    required: true
  },
  personInCharge: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  }
});

module.exports = mongoose.model('Stall', stallSchema);
