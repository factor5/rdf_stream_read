const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    const file = __dirname + "/example.ttl";
    console.log('streaming file', file);

    fs.readFile(file , (err, data) => {
        res.contentType("text/turtle");
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Listening on 3000');
});