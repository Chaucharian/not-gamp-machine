const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 8081;
const app = express();
const firebase = require("firebase-admin");
const firebaseCredentials = require('./firebaseAuth.json');
const distPath = path.join(__dirname, 'dist');
let humedity = 0, temperature = 0;

app.use(cors());
app.use(express.static(distPath));
app.use("/not-gamp-machine/dist", express.static(distPath));
app.listen(port, '0.0.0.0', () => console.log(`Serving API at ${port}!`));

setInterval(() => writeSensorData(temperature, humedity), 900*1000*8);// (900*1000*8) = 2hs

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCredentials),
  databaseURL: "https://not-gamp-machine.firebaseio.com"
});

function writeSensorData(temperature, humedity) {
  const timestamp = Date.now();
  firebase.database().ref('sensordata/data').push({
    temperature,
    humedity,
    timestamp
  });
  console.log(`Data sent to FireBase correctly at ${timestamp}`);
}


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

app.get('/not-gamp-machine', (res) => res.sendFile(distPath+'/index.html'));

app.get('/not-gamp-machine/api/conditions', (req, res) => {
  humedity = req.query.h;
  temperature = req.query.t;
  res.end();
});

app.get('/not-gamp-machine/api/getRange', (req, res) => {
  const { from, to } = req.query;
  readSensorRange(from, to).then(data => {
    console.log(" DATA ",data);
    if (data.length === 0) {
      console.log('wrong entry criteria');
    } else {
      console.log('Data filtered correctly');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data });
  });
});

app.get('/not-gamp-machine/api/getConditions', (res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ humedity, temperature });
});