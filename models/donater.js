

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bd';

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE donators(id SERIAL PRIMARY KEY, community_id integer not null, name VARCHAR(40) not null, contact integer not null,city VARCHAR(20) not null,address VARCHAR(100) not null,bloodtype VARCHAR(2) not null,age integer not null,lastDonation date not null,gender VARCHAR(6) not null,showPrivate boolean not null,createdDate date not null,updatedDate date not null)');

query.on('end', function() {
            client.end(); 
      });