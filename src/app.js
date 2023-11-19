import express from 'express';
import { connection } from './db.js';

const app = express()
const port = 3000

app.use(express.static('public'))

const tables = ['player', 'participatedIn', 'match_', 'playedIn', 'manager']
const idColumns = ['playerID', 'teamID', 'matchNum', 'managerID']

app.get('/api/:table', (req, res) => {
    try {
        if (!tables.includes(req.params.table)) {
            return res.status(404).send('Table not found');
        }

        const where = Object.keys(req.query)
            .filter(key => req.query[key] !== '*')
            .map(key =>
                `${key} LIKE '%${req.query[key]}%'`
            ).join(' AND ');

        connection.query(`SELECT * FROM ${req.params.table} ${where === '' ? '' : 'WHERE'} ${where}`, function (error, results, fields) {
            if (error) return res.status(500).send({ error: error });
            res.send(results);
        });
    } catch (e) {
        res.status(500).send({ error: e });
    }
})

app.post('/api/:table', (req, res) => {
    try {
        if (!tables.includes(req.params.table)) {
            return res.status(404).send('Table not found');
        }

        const set = Object.keys(req.query)
            .filter(key => req.query[key] !== '*')
            .map(key =>
                `${key} = '${req.query[key]}'`
            ).join(', ');

        connection.query(`INSERT INTO ${req.params.table} SET ${set}`, function (error, results, fields) {
            if (error) return res.status(500).send({ error: error });
            res.send(results);
        });
    } catch (e) {
        res.status(500).send({ error: e });
    }
})

app.patch('/api/:table', (req, res) => {
    try {
        if (!tables.includes(req.params.table)) {
            return res.status(404).send('Table not found');
        }
        if (!Object.keys(req.query).some(key => idColumns.includes(key))) {
            return res.status(400).send('ID value not found');
        }

        const where = Object.keys(req.query)
            .filter(key => req.query[key] !== '*')
            .filter((key) => idColumns.includes(key))
            .map(key =>
                `${key} = '${req.query[key]}'`
            ).join(' AND ');

        const updateFields = Object.keys(req.query)
            .filter(key => req.query[key] !== '*')
            .filter((key) => !idColumns.includes(key))
            .map(key =>
                `${key} = '${req.query[key]}'`)
            .join(', ');

        connection.query(`UPDATE ${req.params.table} SET ${updateFields} WHERE ${where}`, function (error, results) {
            if (error) return res.status(500).send({ error: error });
            res.send(results);
        });
    } catch (e) {
        res.status(500).send({ error: e });
    }
})

app.delete('/api/:table', (req, res) => {
    try {
        if (!tables.includes(req.params.table)) {
            return res.status(404).send('Table not found');
        }

        const where = Object.keys(req.query)
            .filter(key => req.query[key] !== '*')
            .map(key =>
                `${key} = '${req.query[key]}'`
            ).join(' AND ');

        if (where === '') return res.status(400).send('No filters provided');

        connection.query('DELETE FROM ' + req.params.table + ' WHERE ' + where, function (error, results, fields) {
            if (error) return res.status(500).send({ error: error });
            res.send(results);
        });
    } catch (e) {
        res.status(500).send({ error: e });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
