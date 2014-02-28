var express = require('express');
var app = express();

app.get('/', function(req, res){
	var body = 'Hello World';
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.end(body);
});

app.post('/update', function( req, res ) {

});

app.listen( process.env.PORT || 3000);