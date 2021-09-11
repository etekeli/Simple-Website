module.exports = (express) => {
    const session = require('express-session');
    const app = express();
    const flash = require('connect-flash');
    require('express-dynamic-helpers-patch')(app);
    const {dbInstance, User, Service, Applicant } = require('../config/database');

    app.dynamicHelpers({
        session: function (req, res) {
            return req.session;
        }
    });
    app.set('view engine', 'pug');
    app.use(express.urlencoded());
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));


    require('../controller/services-list')(app, Service);
    require('../controller/signup')(app, User);
    require('../controller/signin')(app, User);
    require('../controller/dashboard')(app, User, Service, Applicant);


    app.get('/signout', function (req, res) {
        req.session.login = null;
        res.redirect('/');
    });

//use flash
    /*
    app.use(flash());
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    });
*/
    return app;
};
