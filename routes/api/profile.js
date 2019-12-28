const express = require('express');
const Profile = require('../../models/Profile');
const router = express.Router();
const auth = require('../../middleware/auth');

//get our profiles
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(401).json({
        msg: 'No profile found'
      });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: error.errmsg
    });
  }
});

module.exports = router;
