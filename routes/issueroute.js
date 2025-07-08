const express = require('express');
const router = express.Router();

const Issue = require('../model/issue');
const StallInventory = require('../model/inventory')

// POST /issue – Issue books to a stall and update inventory
router.post('/', async (req, res) => {
  const { stallId, issuedBooks } = req.body;

  if (!stallId || !Array.isArray(issuedBooks) || issuedBooks.length === 0) {
    return res.status(400).json({ message: 'stallId and issuedBooks are required' });
  }

  try {
    // 1. Save the issue record
    const newIssue = new Issue({ stallId, issuedBooks });
    await newIssue.save();

    // 2. Update StallInventory for each book
    for (const item of issuedBooks) {
      const { bookId, quantity } = item;

      await StallInventory.findOneAndUpdate(
        { stallId, bookId },
        { $inc: { quantity } },
        { upsert: true, new: true }
      );
    }

    res.status(201).json({ message: 'Books issued and inventory updated', issue: newIssue });
  } catch (err) {
    console.error('Issue error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('stallId', 'stallName inCharge phone') // populate stall info
      .populate('issuedBooks.bookId', 'name rate');     // populate book info

    res.status(200).json(issues);
  } catch (err) {
    console.error('Error fetching issue records:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
