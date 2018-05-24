const express = require('express');
const parser = require('body-parser');
const app = express();

const port = process.env.PORT || 7777;

app.use(express.static('public'));
app.use(parser());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
})
