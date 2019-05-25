const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

let counter = 1
const limitingMiddleware = (req, res, next) => {
  if (req.body.text && counter <= 5) {
    console.log(counter, `Logging req.body.text for you ---> ${req.body.text}`)
    counter++;
  }
  else if (req.body.text && counter > 5){
    console.warn(counter, "You have reached the limit of using the API.");
    res.status(500).end();
  }
  return next();
};

// app.use(limitingMiddleware)
app.post('/messages', limitingMiddleware, (req, res, next) => {
  if (req.body.text) {
    res.json(
      { message: "If you see this, you've succesfully logged req.body.text" }
    );
  }
  else {
    console.error("\nERROR: The request body should have a 'text' property, but it had a '" + Object.keys(req.body) + "' property.\n")
    return res.status(400)
    .end();
  }
  
});

app.listen(port, () => console.log(`Server is listening on port: ${port}\n`));
