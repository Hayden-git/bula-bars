
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
        methods: ['GET', 'POST'],
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

serverApp.post('/register', async (req, res) => {

    const { username, email, password } = req.body

    let salted = await bcrypt.hash(password, saltRounds).then((salted, err) => {
        if (salted) {
            // res.send({ salted: salted })
        }
        return salted;
    });
    // console.log(salted)


    db.none(
        'INSERT INTO public.users (username, email, password) VALUES ($1, $2, $3)',
        [username, email, salted] 
    );
    res.send('Registered');   
});



serverApp.get('/login', (req, res) => {
    if(req.session.user) {
        res.send({ loggedIn: true, user: req.session.user.username });
    } else {
        res.send({ loggedIn: false });
    }
})

serverApp.post('/login', async (req, res) => {

    const { username, password } = req.body

    // get user from db based on username
    const user = await db.oneOrNone('SELECT * FROM public.users WHERE username = $1', [username]);

    if (user) {
        // if there is a matching username, then compare password to hash
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                req.session.user = result;
                console.log(req.session.user)
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

// Import the routes
const bulaBarsRoutes = require('./routes/bula-bars');

// Use the routes
serverApp.use('/api/bula-bars', bulaBarsRoutes);

// Start the server
serverApp.listen(4001, () => {
    console.log('Server is listening on port 4001');
});
