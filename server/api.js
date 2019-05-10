const express = require('express');
const app = express();
const port = 3000;
let humedity = 0, temperature = 0;

app.listen(port, '0.0.0.0',() => console.log(`Example app listening on port ${port}!`));

app.get('/set', (req, res) => {
    humedity = req.query.h;
    temperature = req.query.t;
});

app.get('/data', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //res.json({ response: { temperature: 1, humedity: 2 } });
    return res.status(200).json({ humedity, temperature });
});
