var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
//var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var connectionString = "pg://Admin:toor@localhost:5432/todolist";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* POST new item  */
router.post('/api/v1/communities', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {name: req.body.name, 
                contact: req.body.contact,
                city: req.body.city,
                address: req.body.address,
                createdDate: new Date(),
                updatedDate: new Date()};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO communities(name, contact, city, address, createdDate, updatedDate) values($1, $2, $3, $4, $5, $6)", 
            [data.name, 
            data.contact,
            data.city,
            data.address,
            data.createdDate,
            data.updatedDate]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM communities ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

// GET todo item list
router.get('/api/v1/communities', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM communities ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

//UPDATE item
router.put('/api/v1/communities/:comm_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.comm_id;

    // Grab data from http request
    var data = {name: req.body.name, 
                contact: req.body.contact,
                city: req.body.city,
                address: req.body.address,
                updatedDate: new Date()};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE communities SET name=($1), contact=($2), city=($3), address=($4), updatedDate=($5) WHERE id=($6)", 
            [data.name, 
            data.contact,
            data.city,
            data.address,
            data.updatedDate,
            id]););

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM communities ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});


//DELETE item
router.delete('/api/v1/communities/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM communities WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM communities ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});
