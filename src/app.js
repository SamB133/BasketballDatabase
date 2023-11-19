import express from 'express';
import { connection } from './db.js';

const app = express()
const port = 3000

app.use(express.static('public'))

const tables = ['player', 'participatedIn', 'match_', 'playedIn', 'manager']

app.get('/api/:table', (req, res) => {
    if (!tables.includes(req.params.table)) {
        return res.status(404).send('Table not found');
    }
    //console.log(req.query);
    const where = Object.keys(req.query)
        .filter(key => req.query[key] !== '*')
        .map(key =>
            `${key} LIKE '%${req.query[key]}%'`
        ).join(' AND ');

    connection.query('SELECT * FROM ' + req.params.table + ' WHERE TRUE AND ' + where, function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        res.send(results);
    });
})

app.post('/api/{table}', (req, res) => {
    // TODO: Implement
    if (!tables.includes(req.params.table)) {
        return res.status(404).send('Table not found');
    }
    //console.log(req.query);

    connection.query('INSERT INTO ' + req.params.table + ' SET ?', req.query, function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
        res.send(results);
    });
})

app.patch('/api/{table}', (req, res) => {
    // TODO: Implement
})

app.delete('/api/{table}', (req, res) => {
    // TODO: Implement
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})