var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jade = require('jade');
var PORT = 9430;
var filteredWords = {
	Selfie: 'self-portrait',
	yummers: 'delicious',
	outchea: 'are out here',
	bruh: 'wow',
	doge: 'pug',
	cilantro: 'soap',
	bae: 'loved one',
	swag: 'style',
	yolo: 'carpe diem'
};
/**
set view engine to jade
create views dir and set the path for views
implement body parser middleware

	--create jade template to include form, input field and submit button on the GET request of ('/')
	--respond with the data stored in req.body

**/

app.set('view engine', 'jade');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(function(req, res, next) {

	if (req.body['userMsg']) {
		var msg = req.body['userMsg'].split(' ');
		var newMsg = [];

		msg.forEach(function(word) {
			var replace = false;
			Object.keys(filteredWords).forEach(function(invalidWord) {
				if (word === invalidWord) {
					newMsg += filteredWords[word];
					replace = true;
				}
			});
			if(replace){

			}else{
				newMsg += word +' '
			}

			req.body['userMsg'] = newMsg;
		});

		next();
	} else {
		next();
	}
});

app.route('/')
	.get(function(req, res) {
		res.render('index');
	})
	.post(function(req, res) {
		res.send(req.body['userMsg']);
	});

var server = app.listen(PORT, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on port ' + PORT);
});