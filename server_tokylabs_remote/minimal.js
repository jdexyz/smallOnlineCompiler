var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
const https = require('https');


app.set('port', (process.env.PORT || 80));
app.use('/', express.static(__dirname + '/public'));
app.listen(80);