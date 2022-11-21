import "leaflet";

const TANA_latlong = [-18.933333, 47.516667];
const MAP_ZOOM = 15;

// option for the position of the map
const options = {
  center: TANA_latlong,
  zoom: MAP_ZOOM,
};

// Création de l'interface leaflet
const map = L.map("map", options);

const tileLayer = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
  {
    foo: "bar",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

var marker = L.marker(TANA_latlong).addTo(map);
