const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const { Router } = require('express')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})

const app = express()
const port = 4000

app.listen(port, () => console.log(`Listening on port ${port}`))

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

  app.get('/movies', (req, res, next) => {
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0
    Movie
      .findAll({
        limit, offset
      })
      .then(companies => {
        res.send({ companies })
      })
      .catch(error => next(error))
  })
  
  app.get('/movie/:id', (req, res, next) => {
    Movie
      .findById(req.params.id)
      .then(company => {
        if (!company) {
          return res.status(404).send({
            message: `company does not exist`
          })
        }
        return res.send(company)
      })
      .catch(error => next(error))
  })
  
  app.post('/movies', (req, res, next) => {
    Movie
      .create(req.body)
      .then(company => {
        if (!company) {
          return res.status(404).send({
            message: `company does not exist`
          })
        }
        return res.status(201).send(company)
      })
      .catch(error => next(error))
  })
  
  app.put('/movies/:id', (req, res, next) => {
    Movie
      .findById(req.params.id)
      .then(company => {
        if (!company) {
          return res.status(404).send({
            message: `company does not exist`
          })
        }
        return company.update(req.body).then(company => res.send(company))
      })
      .catch(error => next(error))
  })
  
  app.delete('/movies/:id', (req, res, next) => {
    Movie
      .findById(req.params.id)
      .then(company => {
        if (!company) {
          return res.status(404).send({
            message: `company does not exist`
          })
        }
        return company.destroy()
          .then(() => res.send({
            message: `company was deleted`
          }))
      })
      .catch(error => next(error))
  })




