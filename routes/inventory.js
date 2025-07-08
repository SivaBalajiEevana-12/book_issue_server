const express = require('express');
const router = express.Router();

const StallInventory = require('../model/inventory');

// GET /inventory/:stallId – Get inventory for a specific stall
router.get('/:stallId', async (req, res) => {
  const { stallId } = req.params;

  try {
    const inventory = await StallInventory.find({ stallId })
      .populate('stallId', 'stallName inCharge phone')
      .populate('bookId', 'name rate');

    if (inventory.length === 0) {
      return res.status(404).json({ message: 'No inventory found for this stall' });
    }

    res.status(200).json(inventory);
  } catch (err) {
    console.error('Error fetching inventory by stall:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
