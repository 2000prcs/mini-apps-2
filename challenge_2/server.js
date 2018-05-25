const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 7777;
const parser = require('body-parser');
const db = require('./database/index.js');


app.use(express.static('public'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(morgan('dev'));

// get the user info for confirmation 
app.get('/checkout/:username', (req, res) => {

  db.getUserInfo(req.params.username)
    .then((result) => {
      res.status(200);
      res.send(result);
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});


// save user info per form
app.post('/checkout/:username', (req, res) => {
  db.saveInfo(req.params.username, req.body)
    .then((results) => {
      res.status(201);
      res.end('');
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

