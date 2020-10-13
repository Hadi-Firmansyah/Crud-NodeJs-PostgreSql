const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    password: '23122002',
    database: 'db_siswa',
    host: 'localhost',
    port: 5432
});

module.exports = pool;