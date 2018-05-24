const express = require('express');
const app = express();

const port = process.env.PORT || 7777;

const parser = require('body-parser');

app.use(express.static('public'));
app.use(parser());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})

