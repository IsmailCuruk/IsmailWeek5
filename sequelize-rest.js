const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})

const app = express()
const port = process.env.PORT || 4000

.listen(port, () => console.log(`Listening on port ${port}`))

sequelize.sync()
  .then(() => {
    console.log('Sequelize updated database schema')
  })
  .catch(console.error)

  app
  .use(bodyParser.json())

  const Movie = sequelize.define('movies', {
    title: {
      type: Sequelize.STRING,
      field: 'title',
      allowNull: false,
    },
    yearOfRelease: {
      type: Sequelize.INTEGER,
      field: 'year_of_release',
      allowNull: false,
    },
    synopsis: {
      type: Sequelize.STRING,
      field: 'synopsis',
    }
  })
