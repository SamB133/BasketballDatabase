import { connection as _connection } from './databaseConfig.js';
var connection= _connection
connection.query ('select * from player', function(error, results){
   if (results){
     console.log(results);
   }
   else{
     console.log(error);
   }
});