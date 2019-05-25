const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.post('/messages', (req, res) => {
  console.log(req.body.text)
  res.json({
      text: "If you see this, you've succesfully logged req.body.text",
  })
})

app.listen(port, () => console.log(`Succes; Server is listening on port: ${port}`))
