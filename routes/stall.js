const express = require('express');
const router = express.Router();
const Stall = require('../model/user');

// GET all stalls
router.get('/', async (req, res) => {
  try {
    const stalls = await Stall.find();
    res.json(stalls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new stall
router.post('/user', async (req, res) => {
  const { stallName, personInCharge, phone } = req.body;

  const newStall = new Stall({ stallName, personInCharge, phone });

  try {
    const savedStall = await newStall.save();
    res.status(201).json(savedStall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE stall by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStall = await Stall.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStall) return res.status(404).json({ message: 'Stall not found' });

    res.json(updatedStall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE stall by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStall = await Stall.findByIdAndDelete(req.params.id);
    if (!deletedStall) return res.status(404).json({ message: 'Stall not found' });

    res.json({ message: 'Stall deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
