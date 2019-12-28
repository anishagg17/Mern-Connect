const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

//get currently authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({
      msg: 'error in auth.js api'
    });
  }
});

//Authenticate user
router.post('/', async (req, res) => {
  // console.log();
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errmsg: 'Invalid Credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ errmsg: 'Invalid Credentials' });
    }

    jwt.sign(
      {
        user: {
          id: user.id
        }
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(400).end('error in login api');
  }
});

module.exports = router;
