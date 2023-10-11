const express = require('express');
const router = express.Router();

// Load Article model
const Article = require('../../models/article');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('article route testing!'));

// @route GET api/books
// @description Get all articles
// @access Public
router.get('/', (req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(err => res.status(404).json({ noarticlesfound: 'No Articles found' }));
});

router.post('/', (req, res) => {
  Article.create(req.body)
    .then(article => res.json({ msg: 'Article added successfully' }))
    .catch(err => {
      console.error('Error adding article:', err);
      res.status(400).json({ error: 'Unable to add this article', details: err });
    });
});

// Creating a route for searching articles
router.get('/search', async (req, res) => {
  const searchQuery = req.query.query; // Getting the search query from the request query params

  try {
    // Search for articles with matching title or author name
    const articles = await Article.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive title search
        { authors: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive author name search
      ],
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;


// @route DELETE api/article/:id
// @description Delete article by id
// @access Public
router.delete('/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id, req.body)
    .then(article => res.json({ msg: 'Article entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such an article' }));
});

module.exports = router;
