var express = require('express');
var app = express();

app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});

app.get('/', function(req, res){
	//var body = 'Hello World';
	//res.setHeader('Content-Type', 'text/plain');
	//res.setHeader('Content-Length', body.length);
	var mongo = require('mongodb');

	var mongoUri = process.env.MONGOLAB_URI ||
  			  process.env.MONGOHQ_URL ||
  			  'mongodb://test:pancakes@ds033489.mongolab.com:33489/heroku_app22618166';
  	var myCallback = function ( err, results ) {

  		//console.log( results );
  		res.render('index.jade', { pageTitle: 'Beacon Center', data: results });
  	}
	mongo.Db.connect(mongoUri, function (err, db) {
  		db.collection('mydocs', function(er, collection) {
  			collection.find().toArray( myCallback);
  		});
	});
	
	//res.end(body);
});

app.post('/update', function( req, res ) {
	var body = '{"status":"success"}'
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Content-Length', body.length);
	//console.log(JSON.parse(req));
	var mongo = require('mongodb');

	var mongoUri = process.env.MONGOLAB_URI ||
  			  process.env.MONGOHQ_URL ||
  			  'mongodb://test:pancakes@ds033489.mongolab.com:33489/heroku_app22618166';
  	var obj = JSON.parse(req.body);
  	obj.timestamp = new Date().toString();
	mongo.Db.connect(mongoUri, function (err, db) {
  		db.collection('mydocs', function(er, collection) {
    			collection.insert(obj, {safe: true}, function(er,rs) {
    	
    			});
  		});
	});
	res.end(body);
});

app.listen( process.env.PORT || 3000);
