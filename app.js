"use strict";

////////////////////////////////////////
//getting data from API
let lat, lng, map;

const fetchData = function (ipUser = "") {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_dwa8sZ2rLXbOyLCd7fZQHASemVGTR&ipAddress=${ipUser}`
  )
    .then((response) => response.json())
    .then((data) => {
      lat = data.location.lat;
      lng = data.location.lng;

      cardDetails(
        data.ip,
        data.location.city,
        data.location.country,
        data.location.geonameId,
        data.location.timezone,
        data.isp
      );

      //adding map to UI
      showLocationMap(lat, lng);
    });
};

////////////////////////////////////////
//adding map to UI
const showLocationMap = function (lat, lng) {
  if (map != null) {
    map.remove();

    map = L.map("map").setView([lat, lng], 17);

    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup("Here it is!").openPopup();
  } else {
    map = L.map("map").setView([lat, lng], 17);

    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup("Here it is!").openPopup();
  }
};

////////////////////////////////////////
//adding information on cards

//Event listener: input button
document.querySelector(".input__btn").addEventListener("click", () => {
  cardDetails();
});

const cardDetails = function (ip, city, country, geoId, timezone, isp) {
  document.querySelector("#ip").textContent = `${ip}`;
  document.querySelector("#city").textContent = `${city}, `;
  document.querySelector("#country").textContent = `${country}`;
  document.querySelector("#geoId").textContent = `${geoId}`;
  document.querySelector("#timezone").textContent = `${timezone}`;
  document.querySelector("#isp").textContent = `${isp}`;
};

////////////////////////////////////////
//EVENT LISTENERS

//open user location on map as user loads
document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

//input button click
document.querySelector(".input__btn").addEventListener("click", () => {
  const userInput = document.querySelector(".input__field").value;

  if (userInput.trim() !== "") fetchData(userInput);
});
