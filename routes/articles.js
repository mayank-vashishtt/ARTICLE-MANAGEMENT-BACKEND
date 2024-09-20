const express = require('express');
const Article = require('../models/Article');  // Ensure the Article model is correctly imported
const router = express.Router();

// POST /api/articles - Add a new article
router.post('/', async (req, res) => {
  try {
    const { title, description, text, imageUrl, videoUrl } = req.body;

    if (!title || !description || !text) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const newArticle = new Article({
      title,
      description,
      text,
      imageUrl,  // Accept image or video URLs
      videoUrl,
      likes: 0,
      publishDate: new Date(),
    });

    const article = await newArticle.save();
    res.json(article);
  } catch (err) {
    console.error('Error creating article:', err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/articles - Fetch all articles, with sorting
router.get('/', async (req, res) => {
  const sortOption = req.query.sort || 'date';  // Default to sorting by date

  let sortQuery;
  if (sortOption === 'likes') {
    sortQuery = { likes: -1 };  // Sort by likes in descending order
  } else if (sortOption === 'title') {
    sortQuery = { title: 1 };  // Sort by title alphabetically (ascending)
  } else {
    sortQuery = { publishDate: -1 };  // Sort by publish date (descending)
  }

  try {
    const articles = await Article.find().sort(sortQuery);
    res.json(articles);
  } catch (err) {
    console.error('Error fetching articles:', err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/articles/:id/like - Like an article by its ID
router.post('/:id/like', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);  // Find the article by its ID
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    article.likes += 1;  // Increment the likes count
    await article.save();  // Save the updated article

    res.json(article);  // Return the updated article
  } catch (err) {
    console.error('Error liking article:', err.message);
    res.status(500).send('Server error');
  }
});

// PUT /api/articles/:id - Update an article by its ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, text, imageUrl, videoUrl } = req.body;

    // Find the article by ID
    let article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Update the article fields with the new data
    article.title = title || article.title;
    article.description = description || article.description;
    article.text = text || article.text;
    article.imageUrl = imageUrl || article.imageUrl;
    article.videoUrl = videoUrl || article.videoUrl;

    // Save the updated article
    article = await article.save();
    res.json(article);  // Return the updated article
  } catch (err) {
    console.error('Error updating article:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;