const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema({
  stallId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Stall' },
  reportDate: { type: Date, default: Date.now },
  soldBooks: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      quantitySold: { type: Number, required: true }
    }
  ],
  byCash: { type: Number, default: 0 },
  upi: { type: Number, default: 0 },
  total: { type: Number, default: 0 } // byCash + upi
});

module.exports = mongoose.model('DailyReport', dailyReportSchema);
