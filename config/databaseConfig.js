import { createConnection } from 'mysql';

config = {
   host: 'localhost',
   user: 'root',
   password: 'placeholder',
   database: 'placeholder'
}
var connection = createConnection(config); //added the line
connection.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  }
  console.log('connected successfully to DB.');
});

export const conn = createConnection(config); 