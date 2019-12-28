const gravatar = require('gravatar');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

//register a user
router.post('/', async (req, res) => {
  // console.log(req.body);
  try {
    const avatar = gravatar.url(req.body.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = { ...req.body, avatar, password };
    const result = await User.create(newUser);

    jwt.sign(
      {
        user: {
          id: result._id
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
    res.status(400).end(err.errmsg);
  }
});

module.exports = router;
