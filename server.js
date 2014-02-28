var express = require('express');
var app = express();

app.get('/', function(req, res){
	var body = 'Hello World';
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	var mongo = require('mongodb');

	var mongoUri = process.env.MONGOLAB_URI ||
  			  process.env.MONGOHQ_URL ||
  			  'mongodb://test:pancakes@ds033489.mongolab.com:33489/heroku_app22618166';

	mongo.Db.connect(mongoUri, function (err, db) {
  		db.collection('mydocs', function(er, collection) {
    			collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
    			});
  		});
	});
	res.end(body);
});

app.post('/update', function( req, res ) {

});

app.listen( process.env.PORT || 3000);