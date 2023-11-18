import { createConnection } from 'mysql2';

let config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'placeholder'
}
export let connection = createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.log('error connecting:' + err.stack);
  } else {
    console.log('connected successfully to DB.');
  }
});
