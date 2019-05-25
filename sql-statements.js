const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:lol@localhost:5432/postgres'
const pool = new Pool({ connectionString: connectionString })

pool.on('error', (err, client) => {
  console.error('error event on pool', err)
})

pool.query("CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))")
.then(() => console.log('Tables created successfully'))
.catch(err => {
        console.error('Unable to create tables, shutting down...', err);
        process.exit(1);
})
.then()

// pool.query('INSERT INTO "person" (email) VALUES ($1) RETURNING *', [req.body.email])
// .then(results => res.json(results.rows[0]))
// .catch(next)
