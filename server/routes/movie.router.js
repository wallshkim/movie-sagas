const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "movies"`
    pool.query(queryText)
        .then(results => res.send(results.rows))
        .catch(error => console.log('Error on SELECT movies: ', error));
});

module.exports = router;