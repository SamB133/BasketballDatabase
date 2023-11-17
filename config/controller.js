import { connection as _connection } from 'databaseConfig.js';

const connection = _connection

//placeholder from query select from functiom
connection.query ('select * from player', function(error, results){
   if (results){
     console.log(results);
   }
   else{
     console.log(error);
   }
});