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

//creating profile
router.post('/', auth, async (req, res) => {
  try {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    let profile = await Profile.findOne({
      user: req.user.id
    });
    if (profile) {
      profile = await Profile.findByIdAndUpdate(
        {
          user: req.user.id
        },
        {
          $set: profileFields
        },
        {
          new: true
        }
      );
      return res.json(profile);
    }
    profile = await Profile.create(profileFields);
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.errmsg
    });
  }
});

module.exports = router;
