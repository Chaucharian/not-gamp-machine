const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
// the __dirname is the current directory from where the script is running
app.use(express.static('dist'));
app.use(allowCrossDomain); 

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/dist/index.html');
});

app.listen(port, '0.0.0.0',() => console.log(`Serving UI at ${port}!`));

