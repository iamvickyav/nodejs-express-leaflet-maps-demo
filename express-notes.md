# Express.js Notes

## Creating REST Endpoints using Express.js

### Installation

```sh
> npm install express
```

### Creating Server in server.js

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

### Creating Route in Different File

```js
const express = require('express');

const router = express.Router();

router.get("/", function(req, res) {
    res.json({name : "Router"})
})

module.exports = router;
```

### Registering Route in server.js

```js
app.use("/user", require("./user"));
```

### Registering Static Content Folder

```js
app.use(express.static("public"))
```

For More info, refer here - https://www.youtube.com/watch?v=SccSCuHhOw0&t=1068s&ab_channel=WebDevSimplified 

## Express Middleware Management

* [Express Middlware](https://www.youtube.com/watch?v=lY6icfhap2o&ab_channel=WebDevSimplified)

## Express Session Management

Refer here - https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
