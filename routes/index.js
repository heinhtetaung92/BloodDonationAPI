var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var url = require("url");
//var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var connectionString = "pg://Admin:toor@localhost:5432/bd";

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

// GET todo item list
router.get('/api/v1/communities/:comm_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.comm_id;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM communities WHERE id=($1) ORDER BY id ASC;", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results[0]);
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
            id]);

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
router.delete('/api/v1/communities/:comm_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.comm_id;


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



/* POST new item  */
router.post('/api/v1/donators', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {community_id: req.body.community_id,
                name: req.body.name, 
                contact: req.body.contact,
                city: req.body.city,
                address: req.body.address,
                bloodtype: req.body.bloodtype,
                age: req.body.age,
                lastDonation: req.body.lastDonation,
                gender: req.body.gender,
                showPrivate: req.body.showPrivate,
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
        client.query("INSERT INTO donators(community_id, name, contact, city, address, bloodtype, age, lastDonation, gender, showPrivate, createdDate, updatedDate) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", 
            [data.community_id,
            data.name, 
            data.contact,
            data.city,
            data.address,
            data.bloodtype,
            data.age,
            data.lastDonation,
            data.gender,
            data.showPrivate,
            data.createdDate,
            data.updatedDate]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM donators ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json({"data": results});
        });


    });
});

// GET item list
router.get('/api/v1/donators', function(req, res) {

    var results = [];

    var page = !req.query.page ? 1 : req.query.page;
    page = parseInt(page);
    page--;
    var limit= !req.query.limit ? 15 : req.query.limit;
    limit = parseInt(limit);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM donators ORDER BY id ASC OFFSET " + page*limit + " LIMIT " + limit + ";");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {

            var totalQuery = client.query("SELECT COUNT(*) FROM donators;", function(err, result){
                var total = result.rows[0].count;
                var pagecount = total%limit === 0 ? (total/limit) : ((total/limit) + 1);


                var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

                var nextUrl;
                if(page < pagecount-1){
                    var parts = url.parse(fullUrl, true);
                    parts.query.page++;
                    delete parts.search;
                    nextUrl = url.format(parts);
                }else{
                    nextUrl = "";
                }

                var prevUrl;
                if(page > 0){
                    var parts = url.parse(fullUrl, true);
                    parts.query.page--;
                    delete parts.search;
                    prevUrl = url.format(parts);
                    console.log(prevUrl + "page is " + parts.query.page);
                }else{
                    prevUrl = "";
                }

            
                done();
                return res.json({"data": results, "meta": {"page": parseInt(page)+1, "pagecount": parseInt(pagecount), "limit": parseInt(limit), "total": parseInt(total), "next": nextUrl, "prev": prevUrl}});
            });


        });

    });

});

// GET todo item list
router.get('/api/v1/donators/:comm_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.comm_id;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM donators WHERE id=($1) ORDER BY id ASC;", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results[0]);
        });

    });

});

//UPDATE item
router.put('/api/v1/donators/:donator_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.donator_id;

    // Grab data from http request
    var data = {community_id: req.body.community_id,
                name: req.body.name, 
                contact: req.body.contact,
                city: req.body.city,
                address: req.body.address,
                bloodtype: req.body.bloodtype,
                age: req.body.age,
                lastDonation: req.body.lastDonation,
                gender: req.body.gender,
                showPrivate: req.body.showPrivate,
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
        client.query("UPDATE donators SET community_id=($1), name=($2), contact=($3), city=($4), address=($5), bloodtype=($6), age=($7), lastDonation($8), gender($9), showPrivate($10), updatedDate=($11) WHERE id=($12)", 
            [data.community_id,
            data.name, 
            data.contact,
            data.city,
            data.address,
            data.bloodtype,
            data.age,
            data.lastDonation,
            data.gender,
            data.showPrivate,
            data.updatedDate,
            id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM donators ORDER BY id ASC");

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
router.delete('/api/v1/donators/:todo_id', function(req, res) {

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
        client.query("DELETE FROM donators WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM donators ORDER BY id ASC");

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
