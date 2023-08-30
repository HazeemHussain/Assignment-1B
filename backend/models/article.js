// models/Book.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  pubYear: {
    type: String
  },
  doi: {
    type: String
  },
  summary: {
    type: String
  },
  
});

module.exports = Article = mongoose.model('article', ArticleSchema);