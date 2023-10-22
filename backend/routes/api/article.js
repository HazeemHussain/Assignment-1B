const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express(); // Create an Express app instance
const router = express.Router();
const { ObjectId } = require('mongoose').Types;



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
  Article.find({}, { _id: 1, title: 1, authors: 1, source: 1, pubYear: 1, doi: 1, claim: 1, evidence: 1, status: 1 })
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
  //console.log("displaying search", searchQuery);

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


// Endpoint to approve an article
//thats how the route is supposed to set up
router.put('/:articleId', async (req, res) => {
  try {

    // thats how you do it. watch out for the article id
    const articleId = new ObjectId(req.params.articleId); //thats out the constant is supposed 

    console.log('Received articleId:', articleId);

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    article.status = true; // Approve the article
    await article.save();
    
    console.log('Article approved with ID:', articleId);

    // Log the updated article
    console.log('Updated Article:', article);

    res.json({ message: 'Article approved' });
  } catch (error) {
    console.error('Error approving article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an article by ID
router.delete('/:articleId', async (req, res) => {
  const articleId = new ObjectId(req.params.articleId);
  try {
    
    const article = await Article.findByIdAndRemove(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// @route DELETE api/article/:id
// @description Delete article by id
// @access Public
// router.delete('/article/:id', (req, res) => {
//   Article.findByIdAndRemove(req.params.id, req.body)
//     .then(article => res.json({ msg: 'Article entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'No such an article' }));
// });


module.exports = router;
