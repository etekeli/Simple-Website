module.exports = function (app, User, Service, user_services, Applicant) {

    const {body, validationResult} = require("express-validator");

    app.get('/dashboard', function (req, res) {
        if (req.session.login) {

            user = User.findOne({
                where: {
                    login: req.session.login }
            }).then(async user => {
                const servs = await  Service.findAll({
                    where: {applicantId: user.get('id')},
                    raw: true
                });
                res.render('dashboard.pug', {services: servs, user: user});
            });
        } else res.redirect('/signin');
    });

    app.post('/createService',
        body('name').custom(value =>{
                return value.match(/^[A-Za-z0-9 ]+$/);
        }).withMessage('Le titre ne peut être que des chiffres et des lettres')
            .isLength({min: 4}).withMessage('Le nom doit contenir au moins 4 lettres'),
        body('description').isLength({min: 25}).withMessage("La description doit être longue d'au moins 25 caractères"),
        (req, res) => {
            res.setHeader('Content-Type', 'application/json');


            if (req.session.login) {
                let result = validationResult(req);

                if (result.isEmpty()) {
                    const {name, description, date} = req.body;

                    User.findOne({
                        where: {
                            login: req.session.login }
                    }).then(async user => {
                        Service.create({
                            name: name,
                            description: description,
                            date: date,
                            applicantId: user.get('id')
                        }).then(() => {
                            console.log(result.array());
                        });
                    });
                }
                res.end(JSON.stringify(result.array()));
            }
        });

    app.get('/deleteService/:id', async (req, res) =>{
        let servic = await Service.findOne({
            where: {
                id: req.params.id,
                applicantId: req.session.uuid
            }
        }).then(async service => {
            await service.destroy();
            res.render('dashboard.service.delete.pug', {succes: 'Suppression du service effectuée avec succès'});
        }).catch(e => {
            res.render('dashboard.service.delete.pug', {error: 'Vous n\'avez pas le droit de supprimer ce service'});
        });

    });

}