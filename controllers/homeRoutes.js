const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll();
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// // This should get all the post based on certain criteria
router.get('/category/:category', async (req, res) => {
    console.log("PARAMS: ", req.params)
    try {
        const postData = await Post.findAll();

        const filteredPosts = postData.filter(function (post) {
            return post.category === req.params.category;
        });

        // Serialize data so the template can read it
        const posts = filteredPosts.map((post) => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// This should get all the post based on certain criteria
// This one is based on the system
router.get('/system/:category', async (req, res) => {
    console.log("PARAMS: ", req.params)
    try {
        const postData = await Post.findAll();

        const filteredPosts = postData.filter(function (post) {
            return post.system === req.params.category;
        });

        // Serialize data so the template can read it
        const posts = filteredPosts.map((post) => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// This should get all the post based on certain criteria
// This one is based on the the genre
router.get('/genre/:category', async (req, res) => {
    console.log("PARAMS: ", req.params)
    try {
        const postData = await Post.findAll();

        const filteredPosts = postData.filter(function (post) {
            return post.genre === req.params.category;
        });

        // Serialize data so the template can read it
        const posts = filteredPosts.map((post) => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// This is for conditions of the posting
router.get('/condition/:category', async (req, res) => {
    console.log("PARAMS: ", req.params)
    try {
        const postData = await Post.findAll();

        const filteredPosts = postData.filter(function (post) {
            return post.condition === req.params.category;
        });

        // Serialize data so the template can read it
        const posts = filteredPosts.map((post) => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// getting a single post based on id
// can be used to pull a posting's listing
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// This uses a middleware (a custome one i think) to prevent access to route
// unless they are logged in
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });
        
        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posting', (req, res) => {
    res.render('posting', {
        logged_in: true
    });
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.direct('/profile');
        return;
    }
    res.render('signup');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.render('login');
        return;
    }
    res.render('login');
});

module.exports = router;