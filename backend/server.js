
require('dotenv').config();
const PORT = 4001;

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
        origin: '*',
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
        saveUninitialized: true, 
        cookie: {
            sameSite: process.env.NODE_ENV === 'true' ? 'none' : 'lax',
            expires: 60 * 60 * 24,
        }
    })
);

serverApp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

serverApp.set('view engine', 'ejs')

serverApp.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the user into the database
        const user = await db.one(
            'INSERT INTO public.users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        // Set session variable to indicate the user is logged in
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        console.log("FROM /register route in server.js", req.session.user)

        res.status(200).json({ message: 'Registered and logged in successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// LOGIN POST to log a user in if they enter the right username & password 
serverApp.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM public.users WHERE username = $1', [username]);

        if (user) {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    };
                    console.log("FROM /login POST route in server.js", req.session.user)

                    // Example output of this res.send: Object { message: "Login successful", id: "12", username: "bula12", email: "bula12@gmail.com" }
                    res.send({
                        message: 'Login Successful',
                        id: user.id,
                        username: user.username,
                        email: user.email
                    });
                } else {
                    res.send({ message: 'Wrong username/password' });
                }
            });
        } else {
            res.send({ message: 'No user found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});


// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        console.log("FROM isAuthenticated() Middleware in server.js", req.session.user)
        next(); // User is authenticated, proceed to the next middleware/route
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// LOGIN GET to check if a user is logged in or not...
serverApp.get('/login', (req, res) => {
    // console.log(req.session)
    if(req.session.user) {
        console.log("FROM /login GET route in server.js", req.session.user)
        res.send({ loggedIn: true});
    } else {
        res.send({ loggedIn: false });
    }
})

// Submit a new review
serverApp.post('/api/new-review', isAuthenticated, async (req, res) => {
    const { kavaBarId, reviewText } = req.body;

    // A logged in user will have an assigned session ID
    const loggedInUserId = req.session.user.id;
    console.log("FROM /new-review POST route in server.js", req.session.user.id)

    try {
        // Insert the review into the user_reviews table using the logged-in user's ID
        await db.oneOrNone(
            'INSERT INTO public.user_reviews (kava_bar_detail_id, user_id, review_text) VALUES ($1, $2, $3)',
            [kavaBarId, loggedInUserId, reviewText]
        );
        

        res.status(200).json({ message: 'Review submitted successfully', kavaBarId, loggedInUserId, reviewText });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Error submitting review' });
    }
});

// EDIT REVIEW
serverApp.put('/api/edit-review/:reviewId', isAuthenticated, async (req, res) => {
    const reviewId = req.params.reviewId;
    const { kavaBarId, reviewText } = req.body;

    // users assined session ID
    const loggedInUserId = req.session.user.id;
    console.log("FROM /edit-review PUT route in server.js", req.session.user.id)


    try {
        // Update the review text in the user_reviews table using the logged-in user's ID
        await db.oneOrNone(
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
serverApp.delete('/api/delete-review/:reviewId', isAuthenticated, async (req, res) => {
    const reviewId = req.params.reviewId;

    // users assined session ID
    const loggedInUserId = req.session.user.id;
    console.log("FROM /delete-review DELETE route in server.js", req.session.user.id)

    try {
        // Delete the review from the user_reviews table using the logged-in user's ID
        const result = await db.result(
            'DELETE FROM public.user_reviews WHERE id = $1 AND user_id = $2',
            [reviewId, loggedInUserId]
        );

        if (result.rowCount === 1) {
            res.status(200).json({ message: 'Review deleted successfully', reviewId, loggedInUserId });
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



serverApp.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
