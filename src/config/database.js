const { Sequelize, DataTypes, Model } = require('sequelize');

const dbInstance = new Sequelize('test', 'boss', 'thepass123', {
    host: 'localhost',
    dialect: "sqlite",
    storage: './config/database.sqlite'
});

const User = require('../model/user.js')(dbInstance, DataTypes);
const Service = require('../model/service.js')(dbInstance, DataTypes);

Service.belongsTo(User,
    {
        as: "applicant",
        foreignKey: "applicantId"
    }); // applicant = demandeur en anglais

const Applicant = User.hasMany(Service,
    {
        as: "services",
        foreignKey: "applicantId"
    });



dbInstance.sync({})
    .then(r => "Synchronisation : Succes !")
    .catch(r => console.log(r));

module.exports = {
    dbInstance,
    User,
    Service,
    Applicant
};

/*
 * Test DB
 *
 db.authenticate()
 .then(() => console.log("Connexion : Succes"))
 .catch(err => console.log("Error : " + err));


const enes = User.create({login: "test123", password:"test123", firstName: "Enes", lastName: "LeBoss"})
.then(r => console.log("Creation avec succes : " + r))
.catch(r => console.log(r));

const service = Service.create({
	name:'Faire les courses',
	description: "Besoin de quelqu'un pour faire les courses à ma place. Service rémunéré."})
.then(r => console.log("Creation avec succes : " + r))
.catch(r => console.log(r));*/