// currencyController.js
const express = require('express');

const router = express.Router();

router.get('/api/currency-data', (req, res) => {
  res.json({
    rates: {
      USD: 1.0,
      EUR: 0.85,
    },
  });
});

module.exports = router;
