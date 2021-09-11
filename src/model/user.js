//const db = require('../config/database.js');
const Service = require('./service.js');

const {sequelize, DataTypes, Model} = require('sequelize');

class User extends Model {}

     module.exports = (sequelize, DataTypes) =>{
         User.init({
                 id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true
                 },
                 login: {
                     type: DataTypes.STRING,
                     allowNull: false,
                     unique: true
                 },
                 password: {
                     type: DataTypes.STRING,
                     allowNull: false
                 },
                 firstName: {
                     type: DataTypes.STRING,
                     allowNull: false
                 },
                 lastName: {
                     type: DataTypes.STRING,
                     allowNull: false
                 }
             },
             {
                 sequelize,
                 modelName: 'user',
             }
         );
         return User;

     };
