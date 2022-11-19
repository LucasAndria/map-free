import "leaflet";

const TANA_latlong = [-18.933333, 47.516667];
const MAP_ZOOM = 11;

// Setup the map properties for leaflet
const map = L.map("map", {
  center: TANA_latlong,
  zoom: MAP_ZOOM,
});

// Add maptiler to the map Maptiler tiles
L.tileLayer(
  `https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}.png?key=${process.env.TILE_LAYER_KEY}`,
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

// Add marker
var marker = L.marker(TANA_latlong).addTo(map);
