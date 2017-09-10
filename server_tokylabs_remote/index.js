var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var forceSSL = require('express-force-ssl');
const https = require('https');


app.set('port', (process.env.PORT || 80));
app.use(forceSSL);
app.use('/', express.static(__dirname + '/public'));
app.use(require('helmet')());

app.get('/SEND/', function(request, response) {
	try{
	    var code = request.query.code;
	    console.log(code);
	    var date = new Date();
        var random_hexa = Math.random().toString(16).substr(2);
        //var hash = code.hashCode();

        execSync("mkdir ./tmp/" + random_hexa);
 		fs.writeFileSync("./tmp/" + random_hexa + "/" + random_hexa + ".ino", code);

		exec(`cd ${__dirname}/tmp/${random_hexa} ; make -f ../../makeEspArduino.mk all ESP_ROOT=/root/arduino-esp32/ CHIP=esp32`, function(err){
			if(err){
				console.error("ERROR EXEC \n\n",err);
				console.error(random_hexa + " not working");
			}
			else{
				response.send(random_hexa);
				console.log("Compiled  " + random_hexa);
			}
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


const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};
app.listen(80);
https.createServer(options, app).listen(443);

