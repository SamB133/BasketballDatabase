import { createConnection } from 'mysql2';

let config = {
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'project4347'
}
export let connection = createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.log('error connecting:' + err.stack);
  } else {
    console.log('connected successfully to DB.');
  }
});
