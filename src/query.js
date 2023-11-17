//Connect database with nodejs
const mysql = require('mysql2');

// create a new MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project4347'
});

// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
        connection.query("SELECT * FROM manager", function (err, result, fields){
            if (err) throw err;
                console.log(result);
        });
    }
    // close the MySQL connection
    connection.end();
});

// select
// update
// insert
// delete