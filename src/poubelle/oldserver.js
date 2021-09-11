



var express    = require('express'),
    ejs        = require('ejs');
let http = require('http');
let fs = require('fs');
const { Sequelize } = require('sequelize');
const path = require("path");
const sequelize = require("sequelize");
app = express();

app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.set('views', 'src');

app.get('/', function(req, res) {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '/database.sqlite'
    });

    testDb().then(r => console.log(r));


//    res.render('index.html');
    res.end("Hi");
});
app.get('/login', function(req, res) {
    res.render('index.html');
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Node is listening at http://' + host + ':' + port);
});

async function testDb() {
    try {
        await sequelize.authenticate();
        return 'Connection has been established successfully.';
    } catch (error) {
        return 'Unable to connect to the database:';
    }
}