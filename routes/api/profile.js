const express = require('express');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
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

//get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.errmsg
    });
  }
});

//get someones profile
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile || !profile.handle) {
      return res.status(500).json({
        msg: 'there is no such profile'
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(500).json({
        msg: 'there is no such profile'
      });
    }
    res.status(500).json({
      error: err.message
    });
  }
});

//delete profile ,user, post

router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'user removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.errmsg
    });
  }
});

//add experience
router.put('/experience', auth, async (req, res) => {
  const newExp = {
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.errmsg
    });
  }
});
//delete experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      exp => exp._id != req.params.exp_id
    );
    profile = await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({
      error: err.errmsg
    });
  }
});

//add education
router.put('/education', auth, async (req, res) => {
  const newEdu = {
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.errmsg
    });
  }
});
//delete education
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.education = profile.education.filter(
      edu => edu._id != req.params.edu_id
    );
    profile = await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({
      error: err.errmsg
    });
  }
});

module.exports = router;
