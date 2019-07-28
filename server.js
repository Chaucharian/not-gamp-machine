const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(cors());
app.use(express.static('dist'));

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/dist/index.html');
});

app.get('/data', (req, res) => {
  fetch('https://not-gamp-api.herokuapp.com/data')
  .then(res => res.json())
  .then(function(data) {
    const { humedity, temperature } = data;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ humedity, temperature });
  })
  .catch(function(err) {
    // handle the error here
    console.log(`/data end-point error: ${err}`);
  })
});

app.get('/chartData', (req, res) => {
  const { from, to } = req.query;
  fetch(`https://not-gamp-api.herokuapp.com/getRange?from=${from}&to=${to}`)
  .then(res => res.json())
  .then( data => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  })
  .catch(function(err) {
    // handle the error here
    console.log(`/chartData end-point error: ${err}`);
  })
});

app.listen(port, '0.0.0.0',() => console.log(`Serving UI at ${port}!`));

