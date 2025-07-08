const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  stallId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Stall' },
  issuedBooks: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  issuedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);
