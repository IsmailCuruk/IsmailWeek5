const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const { Router } = require('express')

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

  const router = new Router()

  app
  .use(bodyParser.json())

  router.get('/movies', (req, res, next) => {
    Movie
      .findAll()
      .then(movies => {
        res.send({ movies })
      })
      .catch(error => next(error))
  })
  
  router.get('/movie/:id', (req, res, next) => {
    Movie
      .findById(req.params.id)
      .then(movie => {
        if (!movie) {
          return res.status(404).send({
            message: `movie does not exist`
          })
        }
        return res.send(movie)
      })
      .catch(error => next(error))
  })
  
  router.post('/movies', (req, res, next) => {
    Movie
      .create(req.body)
      .then(movie => {
        if (!movie) {
          return res.status(404).send({
            message: `movie does not exist`
          })
        }
        return res.status(201).send(movie)
      })
      .catch(error => next(error))
  })
  
  router.put('/movies/:id', (req, res, next) => {
    Movie
      .findById(req.params.id)
      .then(movie => {
        if (!movie) {
          return res.status(404).send({
            message: `movie does not exist`
          })
        }
        return movie.update(req.body).then(movie => res.send(movie))
      })
      .catch(error => next(error))
  })
  
  router.delete('/movies/:id', (req, res, next) => {
    Movie
      .findById(req.params.id)
      .then(movie => {
        if (!movie) {
          return res.status(404).send({
            message: `movie does not exist`
          })
        }
        return movie.destroy()
          .then(() => res.send({
            message: `movie was deleted`
          }))
      })
      .catch(error => next(error))
  })




