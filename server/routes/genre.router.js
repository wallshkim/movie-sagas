const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// router.get('/', (req, res) => {
//     const queryText = `SELECT * FROM "genres"`
//     pool.query(queryText)
//         .then(results => res.send(results.rows))
//         .catch(error => {
//             console.log('Error on SELECT movies: ', error);
//         });
// });

router.get('/details/:id', (req, res) => {
    const queryText = `SELECT ARRAY_AGG("genres"."name") as "genres_array" 
    FROM "movies"
    LEFT OUTER JOIN "movie_genres"
    ON "movies"."id"="movie_genres"."movie_id"
    LEFT OUTER JOIN "genres"
    ON "movie_genres"."genre_id"="genres"."id"
    WHERE "movie_genres"."movie_id"=$1`;

    pool.query(queryText, [req.params.id])
        .then(result => { 
            // console.log('results from genre/details/:id: ', result);
            res.send(result.rows) 
        })
        .catch(error => {
            console.log('Error completing SELECT details query', error);
            res.sendStatus(500);
        });
});

module.exports = router;