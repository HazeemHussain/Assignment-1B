// models/articles

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
  
  },
  pubYear: {
    type: String
  },
  doi: {
    type: String
  },

  claim: {
    type: String
  }, 

  evidence: {
    type: String
  }, 

  summary: {
    type: String
  },

  status: {
    type: String,
    default: 'moderator' // Set the default status to 'moderator'
  }

});



module.exports = Article = mongoose.model('article', ArticleSchema);