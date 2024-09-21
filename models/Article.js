// models/Article.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: String,
  likes: {
    type: Number,
    default: 0,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Article', ArticleSchema);
