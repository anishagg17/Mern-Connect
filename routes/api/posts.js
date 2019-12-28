const express = require('express');

const router = express.Router();

//get all posts
router.get('/', (req, res) => {
  res.send('all posts');
});

module.exports = router;
