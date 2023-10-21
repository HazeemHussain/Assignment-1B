const express = require('express');
const router = express.Router();

// Load Article model
const Login = require('../../models/login');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('login route testing!'));

// @route GET api/books
// @description Get all articles
// @access Public
router.get('/', (req, res) => {
    Login.find()
      .then(login => res.json(login))
      .catch(err => res.status(404).json({ noarticlesfound: 'No users found' }));
  });

  router.post('/', (req, res) => {
    Login.create(req.body)
      .then(article => res.json({ msg: 'User added successfully' }))
      .catch(err => {
        console.error('Error adding article:', err);
        res.status(400).json({ error: 'Unable to add this article', details: err });
      });
  });




  module.exports = router;