// import npm packages
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// import other files
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3002;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up session and store it in sequelize db
app.use(session({
    secret: 'oKuk3voRXh$mH19',
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new SequelizeStore({
        db: sequelize,
    })
}));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to port ${PORT}`));
});
