const router = require('express').Router();
const { User } = require('../../models');

// Gets all of the users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Gets a single user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        if (!userData) {
            res.status(404).json({ message: "No user found" });
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// This creates a new user
router.post('/', async (req, res,) => {
    try {
        const userData = await User.create(req.body);
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// These block checks to see if password and email of set
// matches any in the database
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password. Try again' });
            return;
        }

        const rightPass = await userData.checkPassword(req.body.password);

        if (!rightPass) {
            res.status(400).json({ message: 'Incorrect email or password. Try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logging in' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// This block helps with logging out
// The logic is that if session is logged in then the session
// is 'destroyed' if not nothing
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;