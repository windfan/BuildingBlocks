var express = require('express');
var app = express();



app.get('/', function(request, response){
	response.send('OK\n');
});


app.listen(3000);
