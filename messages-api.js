const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())

const validatingMiddleware = (req, res, next) => {
  if (!req.body.text) {
    res.status(400).json({ message: "The request body should have a 'text' property!" })
  } else {
    next()
  }
}

app.post('/messages', validatingMiddleware, (req, res) => {
  console.log("\nLogging req.body.text for you...\n", req.body.text)
  res.json({
    text: "If you see this, you've succesfully logged req.body.text",
  })
})

app.listen(port, () => console.log(`Succes; Server is listening on port: ${port}`))
