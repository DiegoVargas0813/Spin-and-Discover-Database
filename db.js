//INFORMACION AQUI

const { Pool } = require('pg');

const pool = new Pool({
    user: 'superadmin',
    password: 'superadmin',
    host: 'localhost',
    port: 5432,
    database: 'tools'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};