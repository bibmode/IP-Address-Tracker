"use strict";

////////////////////////////////////////
//open user location on map as user loads
let lat, lng;

fetch(`https://geo.ipify.org/api/v1?apiKey=at_dwa8sZ2rLXbOyLCd7fZQHASemVGTR&`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    lat = data.location.lat;
    lng = data.location.lng;
    console.log(lat, lng);

    //adding map to UI
    showLocationMap(lat, lng);
  });

////////////////////////////////////////
//adding map to UI
const showLocationMap = function (lat, lng) {
  var map = L.map("map").setView([lat, lng], 17);

  L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  L.marker([lat, lng]).addTo(map).bindPopup("Here it is!").openPopup();
};

////////////////////////////////////////
//adding information on cards
