const mongoose = require('mongoose');

const stallInventorySchema = new mongoose.Schema({
  stallId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Stall' },
  bookId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Book' },
  quantity: { type: Number, required: true, default: 0 }
});

stallInventorySchema.index({ stallId: 1, bookId: 1 }, { unique: true });

module.exports = mongoose.model('StallInventory', stallInventorySchema);
