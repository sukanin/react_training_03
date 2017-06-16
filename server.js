/*
* @Author: Sukanin
* @Date:   2017-06-16
* @Last Modified by:   Sukanin
* @Last Modified time: 2017-06-16
*/

'use strict';

// 1. import dependencies lib
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let Incident = require('./model/incidents');

// 2. create instance (app , router)
let app = express();
let router = express.Router();

// 3. setup port
let port = 3001;

// db config
mongoose.connect('mongodb://admin:admin@ds030500.mlab.com:30500/sukanin');

//4. now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//5. To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 	res.setHeader('Access-Control-Allow-Origin', '*');
 	res.setHeader('Access-Control-Allow-Credentials', 'true');
 	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	
	//and remove cacheing so we get the most recent data
 	res.setHeader('Cache-Control', 'no-cache');
 	next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//Use our router configuration when we call /api
app.use('/api', router);

// add /incidents
router.route('/incidents')
	// retrieve all incidents from db
	.get(function(req, res) {
		// looks at schema
		Incident.find(function(err, incidents) {
			if (err) {
				res.send(err);
			}
			res.json(incidents);
		});
	})
	.post(function(req, res) {
		let incident = new Incident();
		incident.title = req.body.title;
		incident.descr = req.body.descr;

		incident.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Incident successfully added'});
		});
	});

//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});