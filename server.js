//when refactoring: prepared statements
//create an owners table

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Duckies4$",
	database: "dogs_db"
});

app.use(express.static("public"));

app.use(bodyParser.json());

app.get('/dogs', function(req, res) {
	const age = req.query.age;
	const breed = req.query.breed;

	const ageFilter = age ? " WHERE age > " + age : "";
	const breedFilter = !age && breed ? " WHERE breed = '" + breed + "'": ""; //if age not provided
	const breedFilter2 = age && breed ? " AND breed = '" + breed + "'" : ""; //if age is provided
	connection.query("SELECT * FROM dogs" + ageFilter + breedFilter + breedFilter2, function(err, results) {
		if (err) throw err;
		res.json(results);
	})
})

app.get('/dogs/:id', function(req, res) {
	const id = req.params.id;

	const idFilter = id ? " WHERE id = " + id : "";
	connection.query("SELECT * FROM dogs" + idFilter, function(err, results) {
		if (err) throw err;
		res.json(results);
	})
})

app.post('/dogs', function(req, res) {
	const name = req.body.name;
	const age = req.body.age;
	const breed = req.body.breed;
	const owner_name = req.body.ownerName;
	
	connection.query("INSERT INTO dogs (name, age, breed, owner_name) VALUES ('" 
	+ name + "', '" + age + "', '" + breed + "', '" + owner_name + "');", function(err, results) {
		if (err) throw err;
		res.json(results);
	});
})


app.listen(3001, function () {
	console.log('listening on 3001');
});


