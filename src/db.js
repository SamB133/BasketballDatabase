import { createConnection } from 'mysql2';

let config = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'project4347',
  ssl: {
    rejectUnauthorized: false
  }
}
export let connection = createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.log('error connecting:' + err.stack);
  } else {
    console.log('connected successfully to DB.');
  }
});
