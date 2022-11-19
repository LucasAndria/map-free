import "leaflet";
import "leaflet-routing-machine";
import {
  addTiler,
  createLeafletInterface,
  addMarker,
  showPopup,
} from "./leaflet";

import ac from "./auto-complete";

const stores = [
  { name: "ABC", latlng: [-18.933333, 47.516667] },
  { name: "DEF", latlng: [-18.923333, 47.506667] },
  { name: "GHI", latlng: [-18.943333, 47.526667] },
];

storesName = stores.map((el) => el.name);
const MAP_ZOOM = 15;

const mapOptions = {
  center: stores[0].latlng,
  zoom: MAP_ZOOM,
};

// Create map controller
const map = createLeafletInterface("map", mapOptions);

// Tiles from maptiler
const tiles = `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${process.env.TILE_LAYER_KEY}`;

// Attribution for the tiles
const attribution = {
  attribution:
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
};

// Add the image tiles of the map
addTiler(map, tiles, attribution);

// Add marker and popUp for all stores
const markers = stores.map((el) => {
  let marker = addMarker(map, el.latlng);
  return marker;
});

exports.autoComplete = (element) => {
  ac(element, storesName, true);
};

// Draw a route
exports.addRoute = async (userLatlng, storeName, controller = false) => {
  const [latA, lngA] = userLatlng;

  // Convert storeName
  const storeLatlngB = stores.filter((el) => el.name === storeName)[0].latlng;
  const [latB, lngB] = storeLatlngB;

  const data = { distance: 0, time: 0, header: "" };

  // Create route params and controls
  let control = L.Routing.control({
    waypoints: [L.latLng(latA, lngA), L.latLng(latB, lngB)],
  });

  // Add the control to the map
  control.addTo(map);

  const routingContainer = document.querySelector(".leaflet-routing-container");

  if (!controller) {
    routingContainer.style.display = "none";
  }

  try {
    const routingAlt = await selectorPromise(".leaflet-routing-alt");

    data.distance = routingAlt.children[1].innerText.split(",")[0];
    data.time = routingAlt.children[1].innerText.split(",")[1];
    data.header = routingAlt.children[0].innerText;
  } catch {
    console.log("ERROR!!!");
  }

  return [control, data];
};

exports.deleteRoute = (control) => {
  console.log(map);
  map.removeControl(control);
};
