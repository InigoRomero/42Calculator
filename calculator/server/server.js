var express = require('express'),
		session = require('express-session'),
		app = express(),
		path = require('path');

		const fs = require('fs');
		
		app.use(session({
			secret: '1234567890QWERTY',
			resave: true,
			saveUninitialized: false
		}));
		var cors = require('cors')
app.use(cors()) 
const axios = require('axios');
var ClientOAuth2 = require('client-oauth2')
require('dotenv').config()

var auth = new ClientOAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessTokenUri: process.env.ACCESS_TOKEN_URI,
  authorizationUri: process.env.AUTHORIZATION_URI,
  redirectUri: process.env.REDIRECT_URI
})

app.set('view engine', 'ejs');

app.get('/callback', function (req, res) {

	auth.code.getToken(req.originalUrl) .then(function (user) {
		// Refresh the current users access token.
		user.refresh().then(function (updatedUser) {
		  req.session.token = updatedUser.accessToken;
		  var token = req.session.token;
		  axios.get("https://api.intra.42.fr/v2/me", {
			  headers: {
				'Authorization': 'Bearer ' + token
			  }
			}).then(function (response) {
				let data = JSON.stringify(response.data);
				fs.writeFileSync('me.json', data);
				res.redirect("http://localhost:3000/calculator");
			})
			.catch(function (error) {
				fs.writeFileSync('me.json',  {"bad":"bad"});
				res.redirect("http://localhost:3000/calculator");
			});
		})
	}).catch(function (error) {
		fs.writeFileSync('me.json', {"bad":"bad"});
		res.redirect("http://localhost:3000/calculator");
	  });
});

app.get('/me', function (req, res) {
	let rawdata = fs.readFileSync('me.json');
	let me = JSON.parse(rawdata);
	res.send({me});
});

app.get('/', function (req, res) {
	res.render(path.join(__dirname + '/index.ejs'));
});

app.listen(8080);