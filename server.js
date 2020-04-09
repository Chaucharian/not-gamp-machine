const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8081;
const app = express();
<<<<<<< HEAD
const firebase = require("firebase-admin");
const firebaseCredentials = require('./firebaseAuth.json');
let humedity = 0, temperature = 0;
=======
const API_URL = 'not-gamp-machine-api';
>>>>>>> 49569efc8fa0d1a7059b1e7a80d4267b52db5660

app.use(cors());
app.use(express.static('dist'));
app.listen(port, '0.0.0.0', () => console.log(`Serving UI at ${port}!`));

app.get('/', (req, res) => res.sendFile('index.html'));

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCredentials),
  databaseURL: "https://not-gamp-machine.firebaseio.com"
});

<<<<<<< HEAD
// setInterval(() => writeSensorData(temperature, humedity), 900*1000);// (900*1000) = 15 min

// function writeSensorData(temperature, humedity) {
//   const timestamp = Date.now();
//   firebase.database().ref('sensordata/data').push({
//     temperature,
//     humedity,
//     timestamp
//   });
//   console.log(`Data sent to FireBase correctly at ${timestamp}`);
// }

function readSensorRange(from, to) {
  let chartData = [];
  return firebase.database().ref('sensordata/data').once('value').then(function (snapshot) {
    const responseArray = Object.keys(snapshot.val());
    let filteredData = [];
    for (let index of responseArray) {
      filteredData.push(snapshot.val()[String(index)]);
    }
    chartData = filteredData.filter(entry => from <= entry.timestamp && entry.timestamp <= to);
    return chartData;
  });
}

app.get('/set', (req, res) => {
  humedity = req.query.h;
  temperature = req.query.t;
  res.end();
=======
app.get('/data', (req, res) => {
  fetch(`${API_URL}/data`)
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
>>>>>>> 49569efc8fa0d1a7059b1e7a80d4267b52db5660
});

app.get('/getRange', (req, res) => {
  const { from, to } = req.query;
<<<<<<< HEAD
  readSensorRange(from, to).then(data => {
    console.log(" DATA ",data);
    if (data.length === 0) {
      console.log('wrong entry criteria');
    } else {
      console.log('Data filtered correctly');
    }
=======
  fetch(`${API_URL}/getRange?from=${from}&to=${to}`)
  .then(res => res.json())
  .then( data => {
>>>>>>> 49569efc8fa0d1a7059b1e7a80d4267b52db5660
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data });
  });
});

app.get('/getConditions', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ humedity, temperature });
});
