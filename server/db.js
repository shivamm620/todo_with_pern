const Pool = require('pg');

const pool = new Pool({
    user:'postgres',
    password:'shivam',
    host : 'localhost',
    port:5432,
    database:'todolist'
})

module.exports = pool;