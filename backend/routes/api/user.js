const express = require('express');
const router = express.Router();
const User = require('../../models/user'); // Import the User model

// @route POST api/login
// @description Handle user login
// @access Public (you may want to change this to 'Private' once authentication is implemented)



router.get('/test', (req, res) => res.send('user route testing!'));

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ noarticlesfound: 'No users found' }));
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database based on the username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches (you should hash and compare passwords securely)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // User is authenticated, you can implement user sessions or JWT token generation here

    // Return a success response (you may send a token here for future authentication)
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
