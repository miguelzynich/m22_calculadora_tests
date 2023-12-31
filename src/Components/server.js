// server.js
const express = require('express');
const currencyController = require('./currencyController');

const app = express();

app.use(currencyController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
