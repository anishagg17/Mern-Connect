const express = require('express');

const router = express.Router();

//get all profiles
router.get('/', (req, res) => {
  res.send('all profiles');
});

module.exports = router;
