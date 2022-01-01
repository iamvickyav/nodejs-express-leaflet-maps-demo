const express = require('express');
const mysql = require('./data');
// const cors = require('cors');

const app = express();

// app.use(cors({origin : "*"}));

app.use(express.static('public'))

app.get("/stores", async function(req, res) {

    var result = await mysql.query("select * from store_locations");

    res.json(result[0])
})

app.listen(3000);

// node server.js

// java 