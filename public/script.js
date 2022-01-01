async function createMap() {

    var pos = await new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    var userCurrentLat = pos.coords.latitude;
    var userCurrentLon = pos.coords.longitude;

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

    var storeData = await fetch("http://localhost:3000/stores")

    var storeDataJson = await storeData.json();

    var map = L.map('map').setView([userCurrentLat, userCurrentLon], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // var marker = L.marker([13.060363349037836, 80.21466346777653]).addTo(map);
    // marker.bindPopup("Vadapalani Temple Store").openPopup();

    // var marker2 = L.marker([13.108810292589748, 80.23724666455381]).addTo(map);
    // marker2.bindPopup("TNagar Store").openPopup();

    storeDataJson.forEach(function printStore(store){
        var marker2 = L.marker([store.lat, store.lng]).addTo(map);
        marker2.bindPopup(store.name).openPopup();
    })
}

createMap();