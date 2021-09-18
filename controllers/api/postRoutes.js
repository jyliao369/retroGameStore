const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// This gets all of the post in the database
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// gets a single post based on id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        
        if (!postData) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// This creates a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({ 
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Deleting a listing
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post discovered' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;