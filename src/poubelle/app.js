const express = require('express');

const app = express();
const { Sequelize } = require('sequelize');






async function testDb() {
    try {
        await sequelize.authenticate();
        return 'Connection has been established successfully.';
    } catch (error) {
        return 'Unable to connect to the database:';
    }
}






app.get('/', function(req, res) {
    /*const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite'
    });
*/
    const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
    testDb().then(r => console.log(res.end(r)));
    sequelize.close().then(r => console.log(res.end(r)));

//    res.render('index.html');
//    res.end("Hi");
});





module.exports = app;