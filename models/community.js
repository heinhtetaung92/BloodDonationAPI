

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bd';

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE communities(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, contact integer not null, city VARCHAR(20) not null, address VARCHAR(100) not null, createdDate date not null, updatedDate date not null)');

query.on('end', function() {
		client.end(); 
	});