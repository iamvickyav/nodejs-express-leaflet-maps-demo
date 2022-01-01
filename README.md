# Node.js, Express & Leaflet Maps Demo

## Designing the Home page

### Including Bootstrap

```html
<html>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
</body>
</html
```

### Designing Navbar

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="store-locator.html">Store Locator</a>
              </li>
            </ul>
        </div>
    </div>
</nav>
```

### Designing Contact Form

```html
<div class="container">
        <div class="row mt-5">
            <div class="col-6">
                <div class="text-center">
                    <h1>Electronics Repair at Cheap Price</h1>
                </div>
            </div>
            <div class="col-4 offset-1">
                <form>
                    <h2>Contact us</h2>
                    <div class="form-group mb-3">
                        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                    </div>
                    <div class="form-group mb-3">
                        <input type="text" class="form-control" id="phone" placeholder="Enter Number" name="phone">
                    </div>
                    <button type="button" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
```

## style.css for all pages

```css
body {
  background-image: url('elec.jpeg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: white;
}

h1 {
  font-size: 70px;
}

form {
  background-color: rgb(145, 139, 139);
  padding: 30px 30px;
  border-radius: 27px;
}
```

### Store Locator

```html
<body>
<div class="container">
        <h3>Our Stores spread across the country</h3>
        <div class="row">
            <div class="col-12">
                <div id="map"></div>
            </div>
        </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
    <script src="script.js"></script>
</body>
```

### Client side Javascript to load Map

```js
async function init() {

    var latLong = await getPosition();

    var map = L.map('map').setView([latLong.lat, latLong.lng], 5);


    var res = await fetch("http://localhost:8080/stores");

    var storeData = await res.json();

    // console.log(storeData);

    // var storeDatas = [{
    //         "name": "Chennai Store",
    //         "lat" : "13.034024176374961",
    //         "lng" : "80.22980467407646"
    //     },{
    //         "name": "Madurai Store",
    //         "lat" : "9.9197",
    //         "lng" :  "78.1194",
    //     },{
    //         "name": "Bengaluru Store",
    //         "lat" : "12.966354092089837", 
    //         "lng" : "77.60654923757143",
    //     },{
    //         "name": "Thanjavur Store",
    //         "lat" : "10.77828924274073", 
    //         "lng" : "79.13962128471483",
    // }]

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    storeData.forEach((store) => {
        L.marker([store.lat, store.lng]).addTo(map)
            .bindPopup(store.name)
            .openPopup();
    })
}

async function getPosition(){
    var userLocation = await new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    return {
        "lat" : userLocation.coords.latitude,
        "lng" : userLocation.coords.longitude,
    }
}

init();
```

## Preparing Backend 

### Express.js setup

```sh
> npm init -y

> npm install express

> npm install -D nodemon
```

### MySQL setup

```sh
> npm install mysql2

> npm install cors
```

### server.js

```js
const express = require('express');
const con = require('./database');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}));

app.get("/stores", async function(req, res) {

    var results = await con.query("select * from store_locations");

    res.json(results[0]);
})

app.listen(8080);
```

### database.js

```js
const mysql = require('mysql2/promise')

const db = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'electronic_shop'
}

var connection = mysql.createPool(db);

function query(sql) {
    return connection.query(sql);
}

module.exports = {
    query
};
```


## References

* [Leaflet](https://leafletjs.com/examples.html)
