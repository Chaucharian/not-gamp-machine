const express = require('express');
const app = express();
const port = 3000;
let humedity = 0, temperature = 0;

app.listen(port, '0.0.0.0',() => console.log(`Example app listening on port ${port}!`));

//app.get('/', (req, res) =>   res.sendFile(path.join(__dirname+'/index.html')) );

app.get('/set', (req, res) => {
    humedity = req.query.h;
    temperature = req.query.t;
    console.log(humedity);
});

app.get('/data', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ response: { temperature: 1, humedity: 2 } });
});
