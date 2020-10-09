/**
 * SHODAN
 * 
 * 박재용 <scorpion@dgu.ac.kr>
*/

'use strict';

var express = require('express');
var app = express();

// ========================================
console.log(__dirname)
app.use('/frontend', express.static(__dirname + '/frontend'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/frontend/index.html');
});

// ========================================

	module.exports = app;