const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(cors());
app.use(express.static('dist'));

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/dist/index.html');
});

app.listen(port, '0.0.0.0',() => console.log(`Serving UI at ${port}!`));

