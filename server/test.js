var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;


app.set('port', (process.env.PORT || 82));
app.use('/public', express.static(__dirname + '/public'));


app.get('/SEND/', function(request, response) {
	try{
	    var code = request.query.code;
	    console.log(code);
	    var date = new Date();
        var random_hexa = Math.random().toString(16).substr(2);

        execSync("mkdir ./tmp/" + random_hexa);
 		fs.writeFileSync("./tmp/" + random_hexa + "/" + random_hexa + ".ino", code);

		exec(`cd ${__dirname}/tmp/${random_hexa} ; make -f ../../Makefile ; zip -r arduino-files.zip build-uno`, function(err){

			if(err){
				console.error("ERROR EXEC \n\n",err);
				if(!err){
					console.log(random_hexa + " not working");
				}
			}
			response.send(random_hexa);
			console.log("Compiled  " + random_hexa);
		});
	}
	catch(e){
		console.log(e);
		response.sendStatus(201);

	}
});	

app.get('/GET/*', function(request, response) {
	try{
        var random_hexa = request.url.split("/")[2];
        console.log(random_hexa);
        response.download(__dirname + "/tmp/"+random_hexa + "/arduino-files.zip");
	}
	catch(e){
		console.log(e);
		response.sendStatus(201);
	}
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});