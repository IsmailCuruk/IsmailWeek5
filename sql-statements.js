const colors = require('colors/safe');
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

pool.query('INSERT INTO "person" (first_name, last_name, eye_color) VALUES ($1, $2, $3) RETURNING *', ['James', 'Smith', 'brows eyes'])
  .then(results => console.log(colors.blue('inserting...'), "Rows:\n" + results.rows))
  .catch(err => console.error(err))

pool.query('INSERT INTO "person" (first_name, last_name, eye_color) VALUES ($1, $2, $3) RETURNING *', ['Frank', 'Jones', 'brows eyes'])
  .then(results => console.log(colors.blue('inserting...'), "Rows:\n" + results.rows))
  .catch(err => console.error(err))

pool.query('INSERT INTO "person" (first_name, last_name, eye_color) VALUES ($1, $2, $3) RETURNING *', ['Rebecca', 'Andrews', 'blue eyes'])
  .then(results => console.log(colors.blue('inserting...'), "Rows:\n" + results.rows))
  .catch(err => console.error(err))


pool.query('UPDATE "person" SET eye_color = $2 WHERE eye_color = $1 RETURNING *', ['brown', 'blue'], (err, res) => {
  if (err) {
    console.error('error in Select query', err)
  }
  else {
    console.log(res.rows)
  }
})