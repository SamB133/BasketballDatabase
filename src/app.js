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
    const where = Object.keys(req.query)
        .filter(key => req.query[key] !== '*')
        .map(key =>
            `${key} LIKE '%${req.query[key]}%'`
        ).join(' AND ');

    connection.query('SELECT * FROM ' + req.params.table + ' WHERE TRUE AND ' + where, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.post('/api/:table', (req, res) => {
    if (!tables.includes(req.params.table)) {
        return res.status(404).send('Table not found');
    }
    const set = Object.keys(req.query)
        .filter(key => req.query[key] !== '*')
        .map(key =>
            `${key} = '${req.query[key]}'`
        ).join(', ');

    connection.query('INSERT INTO ' + req.params.table + ' SET ' + set, req.query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.patch('/api/:table', (req, res) => {
    // TODO: Implement
})

app.delete('/api/:table', (req, res) => {
    // TODO: Implement
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})