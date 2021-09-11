
//const Service = require('../model/service.js');

module.exports = function(app, Service) {


	app.get('/', async (req, res) => {
		const services = await Service.findAll({raw: true});
		res.render("services-list.pug", {page_name: 'services-list', services: services});
	});


	app.get('/services-list', async function (req, res) {
		const services = await Service.findAll({raw: true});
		res.render("services-list.pug", {page_name: 'services-list', list: services});
	});



}