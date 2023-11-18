import express from 'express';
import { connection } from './db.js';

const app = express()
const port = 3000

app.use(express.static('public'))

const generateWhereClause = (query) =>
    Object.keys(query)
        .filter(key => query[key] !== '*')
        .map(key =>
            `${key} LIKE '%${query[key]}%'`
        ).join(' AND ');

app.get('/api/player', (req, res) => {
    console.log(req.query);
    connection.query('SELECT * FROM player WHERE TRUE AND ' + generateWhereClause(req.query), function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})

app.get('/api/team', (req, res) => {
    console.log(req.query);
    connection.query('SELECT * FROM team WHERE TRUE AND ' + generateWhereClause(req.query), function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})

app.get('/api/manager', (req, res) => {
    console.log(req.query);
    connection.query('SELECT * FROM manager WHERE TRUE AND ' + generateWhereClause(req.query), function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})

app.get('/api/match', (req, res) => {
    console.log(req.query);
    connection.query('SELECT * FROM match WHERE TRUE AND ' + generateWhereClause(req.query), function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})

app.get('/api/participatedIn', (req, res) => {
    console.log(req.query);
    connection.query('SELECT * FROM participatedIn WHERE TRUE AND ' + generateWhereClause(req.query), function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})

app.get('/api/playedIn', (req, res) => {
    console.log(req.query);
    connection.query('SELECT * FROM playedIn WHERE TRUE AND ' + generateWhereClause(req.query), function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})