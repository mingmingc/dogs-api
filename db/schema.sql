DROP DATABASE IF EXISTS cats_db;
CREATE DATABASE cats_db;

USE cats_db;

CREATE TABLE IF NOT EXISTS cats (
id INT AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
age INT NOT NULL,
PRIMARY KEY (id)
);


-- 6. in server.js make a route that returns all the pets, the url should be /pets
-- 7. in server.js make a route that returns all the pets over 5, the url should be /over-five
-- 8. in index.html, display all the pets onto the page under a h2 of all pets
-- 9. in index.html, display all the pets over five years old onto the page under a h2 of all pets over five years old
