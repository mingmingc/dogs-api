var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
});

app.use(express.static("public"));

app.use(bodyParser.json());

app.get('/dogs', function(req, res) {
	const age = req.query.age;
	const breed = req.query.breed;

	const ageFilter = age ? " WHERE age > ? " : "";
	const breedFilter = !age && breed ? " WHERE breed = ' ? '": ""; //if age not provided
	const breedFilter2 = age && breed ? " AND breed = ' ? '" : ""; //if age is provided
	connection.query("SELECT * FROM dogs" + ageFilter + breedFilter + breedFilter2, [age, breed], function(err, results) {
		if (err) throw err;
		res.json(results);
	})
})

app.get('/dogs/:id', function(req, res) {
	const id = req.params.id;

	const idFilter = id ? " WHERE id = ? " : "";
	connection.query("SELECT * FROM dogs" + idFilter, id, function(err, results) {
		if (err) throw err;
		res.json(results);
	})
})

app.post('/dogs', function(req, res) {
	const name = req.body.name;
	const age = req.body.age;
	const breed = req.body.breed;
	const ownerName = req.body.ownerName;
	
	connection.query("INSERT INTO dogs (name, age, breed, owner_name) VALUES (' ? ', ' ? ', ' ? ', ' ? ');",
	[name, age, breed, ownerName], function(err, results) {
		if (err) throw err;
		res.json(results);
	});
})

app.put('/dogs/:id', function(req, res) {
	const id = req.params.id;
	const age = req.body.age;
	const breed = req.body.breed;
	const ownerName = req.body.ownerName;

	const filter = "UPDATE dogs SET age = ' ? ', breed = ' ? ', owner_name = '? ' WHERE id = ? ";
	console.log(filter);
	connection.query(filter, [age, breed, ownerName], function(err, results){
		if (err) throw err;
		res.json(results);
	})
})

app.delete('/dogs/:id', function(req, res) {
	const id = req.params.id;

	connection.query("DELETE FROM dogs WHERE id = ?", id, function(err, results) {
		if (err) throw err;
		res.json(results);
	})
})

app.listen(3001, function () {
	console.log('listening on 3001');
});


