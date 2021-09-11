/*const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../config/database.js');

*/
const { Sequelize, DataTypes, Model } = require('sequelize');

class Service extends Model {}

module.exports = (Sequelize, DataTypes) => {
    Service.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            }
        },
        {
            sequelize: Sequelize,
            modelName: 'service',
        });


    return Service;
};