import express from 'express';
import { connection } from './db.js';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    connection.query('SELECT * FROM player', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})