// Import modules
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');
const handlebars = require('handlebars');
const helmet = require('helmet');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const path = require('path');
const cards = require('./routes/cards-route');
const schedule = require('./routes/schedule-route');
const anncmnts = require('./routes/anncmnts-route');
const admin = require('./routes/admin-route');
const home = require('./routes/home-route');
const users = require('./routes/users-route');
const coupons = require('./routes/coupons-route');
const helpers = require('./services/helpers');
const flash = require('express-flash-messages');
const expressValidator = require('express-validator');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const { env } = require('process');
require('./services/passport')(passport);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Database connection
mongoose.connect(process.env.DB_URI , {
    useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MONGOOSE CONNECTION ERROR:\n'));
db.once('open', () => console.log('Connected to database'));

// Express application
const app = express();

// Helmet
// app.use(helmet());

// View engine
const hbs = exphbs.create({
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: helpers
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: '25mb'}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public'))); // ?

// Data sanitization
// app.use(mongoSanitize());

// User variable
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
});

// Router mounting
app.use('/users', users);
app.use('/anncmnts', anncmnts);
app.use('/card', cards);
app.use('/schedule', schedule);
app.use('/admin', admin);
app.use('/coupons', coupons);
app.use('/', home);

app.get('*', (req, res) => {
    res.status(404).render('404', { user: req.user });
});

// Export module
module.exports = app;
