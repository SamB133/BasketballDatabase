import createConnection from '../node_modules/mysql2/promise.js';

config = {
   host: 'localhost',
   user: 'root',
   password: 'placeholder',
   database: 'placeholder'
}
var connection = createConnection(config);

connection.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  }
  console.log('connected successfully to DB.');
});

export { connection };