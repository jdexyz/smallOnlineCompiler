var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var exec = require('child_process').exec;


app.set('port', (process.env.PORT || 82));

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/json', express.static(__dirname + '/json'));
app.use('/public', express.static(__dirname + '/public'));


app.get('/SEND/', function(request, response) {
	//response.sendStatus(200);
	try{
		//console.log(request.query);
	    var code = request.query.code;
	    var date = new Date();
        var random_hexa = Math.random().toString(16).substr(2);
 		fs.writeFileSync("./tmp/" + random_hexa + ".c", code);
		exec('gcc ./tmp/' + random_hexa + '.c -o ./tmp/' + random_hexa, function(err){
			if(err){
				//throw err
				console.error(err);
				if(!err){
					console.log(random_hexa + " not working");
				}
			}
			response.send(random_hexa);
        	//response.download(__dirname + "/tmp/"+random_hexa);
			console.log("YES  " + random_hexa);
		});
	}
	catch(e){
		console.log(e);
		response.sendStatus(201);

	}
});	

app.get('/GET/*', function(request, response) {
	//response.sendStatus(200);
	try{
	    // var code = request.body.code;
	    // var date = new Date();
        //var random_hexa = Math.random().toString(16).substr(2);
        var random_hexa = request.url.split("/")[2];
        console.log(random_hexa);
        response.download(__dirname + "/tmp/"+random_hexa);
        //response.sendStatus(200);
 		// fs.writeFileSync("./tmp/" + random_hexa + ".c", code);
		// exec('gcc ' + random_hexa + '.c -o ' + random_hexa, function(err){
		// 	if(err){
		// 		throw err
		// 	}
		// 	response.send("./tmp/"+random_hexa);
		// });
	}
	catch(e){
		console.log(e);
		response.sendStatus(201);
	}
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});