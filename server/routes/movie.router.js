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

router.put('/edit/:id', (req, res) => {
    const updatedMovie = req.body;

    const queryText = `UPDATE "movies"
    SET "title" = $1, "description" = $2, 
    WHERE id=$3`;

    const queryValues = [
        updatedMovie.title,
        updatedMovie.description,
        updatedMovie.id
    ];

    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((error) => {
            console.log('Error completing UPDATE movie query', error);
            res.sendStatus(500);
        });
});

module.exports = router;