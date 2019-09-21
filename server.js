//when refactoring: prepared statements
//create an owners table

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "Duckies4$",
	database: "cats_db"
});

/*
	anything in the public folder will have a route for it

		the route will be the name of the file

		the response will be the file itself
*/

app.use(express.static("public"));

app.use(bodyParser.json());

app.get('/cats', function (req, res) {
	const age = req.query.age;
	const ageIsValid = checkAge(age);
	console.log(age)
	if (age && !ageIsValid) {
		res.status(400);
		res.send("Please provide age in number format (e.g. 5, not 'five')");
		return;
	}

	const filter = age ? " WHERE age > " + age : "";
	connection.query("SELECT * FROM cats" + filter, function (err, results, fields) {
		if (err) throw err;
		res.json(results);
	})
});

app.get('/cats/:id', function (req, res) {
	const id = req.params.id;
	const idIsValid = checkId(id);
	if (!idIsValid) {
		res.status(404);
		res.send("Cat not found!")
		return;
	}
	connection.query("SELECT * FROM cats WHERE id = " + id, function (err, results, fields) {
		if (err) throw err;
		res.json(results);
	})
});

app.post('/cats', function (req, res) {
	console.log(req.body)
	const name = req.body.name;
	const age = req.body.age;
	const ageIsValid = checkAge(age);
	const nameIsValid = checkName(name);

	if (!ageIsValid) {
		res.status(400);
		res.send("Please provide age in number format (e.g. 5, not 'five')");
		return;
	} else if (!nameIsValid) {
		res.status(400);
		res.send("Please name your cat!");
		return;
	}
	connection.query("INSERT INTO cats (name, age) VALUES ('" + name + "', " + age + ")", function (err, results, fields) {
		if (err) throw err;
		res.json(results);
	})
});


app.delete('/cats/:id', function (req, res) {
	const id = req.params.id;
	const idIsValid = checkId(id);
	if (!idIsValid) {
		res.status(404);
		res.send("Cat not found!")
		return;
	}

	connection.query("DELETE FROM cats WHERE id = " + id, function (err, results, fields) {
		if (err) throw err;
		res.json(results);
	})
});

app.put('/cats/:id', function (req, res) {
	const id = req.params.id;
	const age = req.body.age;
	const idIsValid = checkId(id);
	const ageIsValid = checkAge(age);
	if (!ageIsValid) {
		res.status(400);
		res.send("Please provide age in number format (e.g. 5, not 'five')");
		return;
	}

	if (!idIsValid) {
		res.status(404);
		res.send("Cat not found!")
		return;
	}

	connection.query("UPDATE cats SET age = " + age + " WHERE id = " + id, function (err, results, fields) {
		if (err) throw err;
		res.json(results);
	})
});

app.listen(3001, function () {
	console.log('listening on 3001');
});

function checkAge(age) {
	return !(isNaN(age) || age.length === 0);
}

function checkId(id) {
	return !(isNaN(id) || id.length === 0);
}

function checkName(name) {
	return !(name.length === 0);

}


