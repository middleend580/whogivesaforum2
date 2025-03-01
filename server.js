const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { getAllPosts, createPost } = require('./database');

app.use(express.static('public'));
app.use(bodyParser.json()); // For parsing application/json

// Endpoint to get all posts
app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

// Endpoint to create a new post
app.post('/posts', async (req, res) => {
    const { content } = req.body;
    if (content) {
        await createPost(content);
        res.status(201).json({ message: 'Post created successfully!' });
    } else {
        res.status(400).json({ error: 'Post content is required' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
