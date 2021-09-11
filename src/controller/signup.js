module.exports = function (app, User) {
    const {body, validationResult} = require("express-validator");
    const crypto = require('crypto');
    const bodyParser = require("body-parser");
    var multer = require('multer');
    var upload = multer();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(upload.array());
    app.use(bodyParser.json());

    app.get('/signup', function (req, res) {
        if (req.session.login)
            res.redirect('/dashboard');
        else
            res.render("signup.pug", {page_name: 'signup'});
    });


    app.post('/signup',
        body('lastName')
            .isAlpha().withMessage('Le nom ne doit contenir que des lettres')
            .isLength({min: 4}).withMessage('Le nom doit contenir au moins 4 lettres'),
        body('firstName')
            .isAlpha().withMessage('Le prénom ne doit contenir que des lettres')
            .isLength({min: 4}).withMessage('Le prénom doit contenir au moins 4 lettres'),
        body('login')
            .isAlphanumeric().withMessage('Le pseudonyme ne doit contenir que des lettres et des chiffres')
            .isLength({min: 6}).withMessage('Le pseudonyme doit être long d\'au moins 6 lettres/chiffres')
            .custom(value => {
                return User.findOne({
                    where: {login: value}
                }).then(user => {
                    if (user)
                        throw new Error('Login déjà utilisé');
                });
            }),
        body('password')
            .custom((value, { req }) => {
                    if (value !== req.body.repeatPassword)
                        throw new Error('Les mots de passe ne sont pas les mêmes');

                    return true;
                    }),
        (req, res) => {
            if (req.session.login)
                res.redirect('/dashboard');

            let result = validationResult(req);

            const {login, password, repeatPassword, firstName, lastName} = req.body;

            if (result.isEmpty()) {
                const shasum = crypto.createHash('sha256').update(password).digest('hex');

                User.create({login: login, password: shasum, firstName: firstName, lastName: lastName})
                    .then(user => {
                        console.log("Creation avec succes : " + user);

                        req.session.uuid = user.id;
                    })
                    .catch(r => console.log(r));

                req.session.login = req.body.login;
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.array()));
//            else    res.render("signup.pug", {page_name: 'signup', errors: result.array()});
        });
}
