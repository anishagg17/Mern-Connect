const express = require('express');

const router = express.Router();

//get all auth
router.get('/', (req, res) => {
  res.send('all auth');
});

module.exports = router;
