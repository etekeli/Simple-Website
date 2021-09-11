const crypto = require('crypto');

module.exports = (app, User) => {
    app.get('/signin', function (req, res) {
        if(req.session.login)
            res.redirect('/dashboard');
        else
            res.render("signin.pug", {page_name: 'signin'});
    });

    app.post('/signin', async function (req, res) {
        console.log(req.body.login);
        if(req.session.login)
            res.redirect('/dashboard');

        const user = await User.findOne({
            where:
                {
                    login: req.body.login,
                    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
                }
        });

        if(user){
            req.session.login = req.body.login;
            req.session.uuid = user.id;
            res.redirect('/dashboard');
        } else
            res.render("signin.pug", {page_name: 'signin', error: 'Identifiant ou mot de passe invalide !'});

    });
}