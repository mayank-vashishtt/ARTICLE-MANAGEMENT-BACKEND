// controllers/articleController.js
const Article = require('../models/Article');

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      text: req.body.text,
      author: req.user.id,
      imageUrl: req.file ? req.file.path : null,
    });
    const article = await newArticle.save();
    res.json(article);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishDate: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Like an article
exports.likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    article.likes += 1;
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).send('Server error');
  }
};