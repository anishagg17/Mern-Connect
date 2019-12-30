const express = require('express');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const router = express.Router();
const auth = require('../../middleware/auth');
const request = require('request');

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
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
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
    // console.log('HIT');
    if (!profile) {
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
    await Pos;
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
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err
    });
  }
});

//get github

router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECTRET}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };
    await request(options, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        // console.error(error);
        return res.status(500).json({
          error: error
        });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error
    });
  }
});

module.exports = router;
