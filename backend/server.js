
require('dotenv').config();

const express = require('express');
const serverApp = express();
const pgp = require('pg-promise')(/*options*/);
const db = pgp(process.env.DB_CONNECTION);

const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);

const cookieParser= require('cookie-parser')
const session = require('express-session');

serverApp.use(express.static('public'))
serverApp.use(express.urlencoded({ extended: true}))
serverApp.use(express.json())
serverApp.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'PUT', 'POST'],
        credentials: true
    })
);

serverApp.use(cookieParser())

serverApp.use(
    session({
        key: 'userId',
        secret: process.env.SESSIONS_SECRET,
        resave: false,
        saveUninitialized: false, 
        cookie: {
            expires: 60 * 60 * 6,
        }
    })
);

serverApp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

serverApp.set('view engine', 'ejs')

// REGISTER / CREATE ACCOUNT
serverApp.post('/register', async (req, res) => {

    const { username, email, password } = req.body

    let salted = await bcrypt.hash(password, saltRounds).then((salted, err) => {
        if (salted) {
            // res.send({ salted: salted })
        }
        return salted;
    });
    // Only use the console.log() to test if its working
    // console.log(salted)

    db.none(
        'INSERT INTO public.users (username, email, password) VALUES ($1, $2, $3)',
        [username, email, salted] 
    );
    res.send('Registered');   
});

// LOGIN GET to check if a user is logged in or not...
serverApp.get('/login', (req, res) => {
    if(req.session.user) {
        res.send({ loggedIn: true});
    } else {
        res.send({ loggedIn: false });
    }
})

// LOGIN POST to log a user in if they enter the right username & password 
serverApp.post('/login', async (req, res) => {

    const { username, password } = req.body

    // get user from db based on username
    const user = await db.oneOrNone('SELECT * FROM public.users WHERE username = $1', [username]);

    if (user) {
        // console.log(user) //
        // if there is a matching username, then compare password to hash
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                // req.session.user = result;

                // Store user info in session - Maybe take out of production at demo day
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
                console.log(req.session.user) // Example OUTPUT: { id: '12', username: 'bula12', email: 'bula12@gmail.com' } - when a user logs in... Here is there info from the database, and saved with sessions
                res.send({ message: 'Login successful' });
            }
        })
    } else if (user) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (!result) {
                res.send({ message: 'Wrong username/password', error});
            }
        }) 
    } else {
        res.send('No user found')
    }


});

// Submit a new review
serverApp.post('/api/new-review', async (req, res) => {
    const { kavaBarId, reviewText } = req.body;

    // Check if the user is logged in before allowing review submission
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ error: 'Please log in to leave a review' });
    }

    // A logged in user will have an assigned session ID
    const loggedInUserId = req.session.user.id;

    try {
        // Insert the review into the user_reviews table using the logged-in user's ID
        await db.none(
            'INSERT INTO public.user_reviews (kava_bar_detail_id, user_id, review_text) VALUES ($1, $2, $3)',
            [kavaBarId, loggedInUserId, reviewText]
        );

        res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Error submitting review' });
    }
});

// EDIT REVIEW
serverApp.put('/api/edit-review/:reviewId', async (req, res) => {
    const reviewId = req.params.reviewId;
    const { kavaBarId, reviewText } = req.body;

    // Check if the user is logged in before allowing review editing
    if (!req.session.user) {
        return res.status(401).json({ error: 'Please log in to edit a review' });
    }

    // users assined session ID
    const loggedInUserId = req.session.user.id;

    try {
        // Update the review text in the user_reviews table using the logged-in user's ID
        await db.none(
            'UPDATE public.user_reviews SET review_text = $1 WHERE id = $2 AND user_id = $3 AND kava_bar_detail_id = $4',
            [reviewText, reviewId, loggedInUserId, kavaBarId]
        );

        res.status(200).json({ message: 'Review edited successfully', reviewText, reviewId, loggedInUserId, kavaBarId });
    } catch (error) {
        console.error('Error editing review:', error);
        res.status(500).json({ error: 'Error editing review' });
    }
});


// DELETE REVIEW route
serverApp.delete('/api/delete-review/:reviewId', async (req, res) => {
    const reviewId = req.params.reviewId;

    // Check if the user is logged in before deleting
    if (!req.session.user) {
        return res.status(401).json({ error: 'Please log in to delete a review' });
    }

    // users assined session ID
    const loggedInUserId = req.session.user.id;

    try {
        // Delete the review from the user_reviews table using the logged-in user's ID
        const result = await db.result(
            'DELETE FROM public.user_reviews WHERE id = $1 AND user_id = $2',
            [reviewId, loggedInUserId]
        );

        if (result.rowCount === 1) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ error: 'Review not found or unauthorized' });
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Error deleting review' });
    }
});



// Import the bula-bar route
const bulaBarsRoutes = require('./routes/bula-bars');

// Use the bula-bar route
serverApp.use('/api/bula-bars', bulaBarsRoutes);

// Start the server
serverApp.listen(4001, () => {
    console.log('Server is listening on port 4001');
});

