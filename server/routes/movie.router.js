const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "movies"`
    pool.query(queryText)
        .then(results => res.send(results.rows))
        .catch(error => console.log('Error on SELECT movies: ', error));
});


router.get('/details/:id', (req, res) => {
    const queryText = 'SELECT * FROM "movies" WHERE "id"=$1';
    pool.query(queryText, [req.params.id])
        .then((result) => { res.send(result.rows); })
        .catch((error) => {
            console.log('Error completing SELECT details query', error);
            res.sendStatus(500);
        });
});

module.exports = router;