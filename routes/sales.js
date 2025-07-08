const express = require('express');
const router = express.Router();

const DailyReport = require('../model/dailyreport');
const StallInventory = require('../model/inventory');

// POST /sales – Record daily sales and update inventory
router.post('/', async (req, res) => {
  const { stallId, soldBooks, byCash = 0, upi = 0 } = req.body;

  if (!stallId || !Array.isArray(soldBooks) || soldBooks.length === 0) {
    return res.status(400).json({ message: 'stallId and soldBooks are required' });
  }

  try {
    const total = byCash + upi;

    // 1. Create daily report
    const report = new DailyReport({ stallId, soldBooks, byCash, upi, total });
    await report.save();

    // 2. Update inventory: subtract quantity sold
    for (const { bookId, quantitySold } of soldBooks) {
      const inventory = await StallInventory.findOne({ stallId, bookId });

      if (!inventory || inventory.quantity < quantitySold) {
        return res.status(400).json({
          message: `Not enough stock for book ID ${bookId}`
        });
      }

      await StallInventory.findOneAndUpdate(
        { stallId, bookId },
        { $inc: { quantity: -quantitySold } }
      );
    }

    res.status(201).json({ message: 'Sales recorded and inventory updated', report });
  } catch (err) {
    console.error('Sales POST error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /sales – Fetch all sales reports
router.get('/', async (req, res) => {
  try {
    const reports = await DailyReport.find()
      .populate('stallId', 'stallName inCharge phone')
      .populate('soldBooks.bookId', 'name rate');

    res.status(200).json(reports);
  } catch (err) {
    console.error('Sales GET error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
