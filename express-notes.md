# Express.js Notes

## Installation

```sh
> npm install express
```

## Creating Server in server.js

```js
const express = require('express');

const app = express();

app.get("/", function(req, res) {
    res.json({name : "vicky"})
})

app.use("/user", require("./user"));

app.use(express.static("public"))

app.listen(3000);const express = require('express');

const app = express();

app.get("/", function(req, res) {
    res.json({name : "vicky"})
})

app.listen(3000);
```

## Creating Route in Different File

```js
const express = require('express');

const router = express.Router();

router.get("/", function(req, res) {
    res.json({name : "Router"})
})

module.exports = router;
```

## Registering Route in server.js

```js
app.use("/user", require("./user"));
```

## Registering Static Content Folder

```js
app.use(express.static("public"))
```
