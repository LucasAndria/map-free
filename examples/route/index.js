import "leaflet";
import { myRouting } from "../../src/index";

const TANA_latlong = [-18.933333, 47.516667];
const MAP_ZOOM = 14;

const ANTOHOMADINIKA = [-18.90355, 47.5118741];
const MAHAMASINA = [-18.9167735, 47.5205281];

// option for the position of the map
const options = {
  center: MAHAMASINA,
  zoom: MAP_ZOOM,
};

// Create leaflet interface and controller
const map = L.map("map", options);

// Add tile layer (using maptiler)
const tileLayer = L.tileLayer(
  `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${process.env.TILE_LAYER_KEY}`,
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

// map.panTo([-18.933333, 47.586667]);

async function addtomap() {
  const data = await myRouting(ANTOHOMADINIKA, MAHAMASINA);
  map.fitBounds(data.bounding);

  L.polyline(data.lineString, {
    color: "blue",
  }).addTo(map);

  const startMarker = L.marker(data.query.coordinates[0].reverse()).addTo(map);
  const endMarker = L.marker(data.query.coordinates[1].reverse()).addTo(map);

  L.polyline([data.query.coordinates[0], data.lineString[0]], {
    color: "black",
  }).addTo(map);

  L.polyline(
    [data.query.coordinates[1], data.lineString[data.lineString.lenght - 1]],
    {
      color: "black",
    }
  ).addTo(map);
}

addtomap();
