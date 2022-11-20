import axios from "axios";
import "leaflet";
import "leaflet-control-geocoder";

import { addMarker, addTiler, createLeafletInterface } from "./leaflet";

// const TANA_latlong = [-18.933333, 47.516667];
// const MAP_ZOOM = 15;
const ORS_Domain = "https://api.openrouteservice.org";

// const mapOptions = {
//   center: TANA_latlong,
//   zoom: MAP_ZOOM,
// };

// // Create map controller
// const map = createLeafletInterface("map", mapOptions);

// // Tiles from maptiler
// const tiles = `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${process.env.TILE_LAYER_KEY}`;

// // Attribution for the tiles
// const attribution = {
//   attribution:
//     '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
// };

// addTiler(map, tiles, attribution);

exports.geoCode = async (name) => {
  // GEOCODING
  try {
    const res = await axios({
      method: "GET",
      url: `${ORS_Domain}/geocode/search?api_key=${process.env.OPEN_ROUTE_SERVICE_KEY}&text=${name}`,
    });

    if (res.statusText === "OK") console.log("results : ", res.data);
  } catch (err) {
    console.log(err);
  }

  // Autocomplete
  try {
    const res = await axios({
      method: "GET",
      url: `${ORS_Domain}/geocode/autocomplete?api_key=${process.env.OPEN_ROUTE_SERVICE_KEY}&text=${name}`,
    });

    if (res.statusText === "OK") console.log("results : ", res.data);
  } catch (err) {
    console.log(err);
  }

  // ADD marker to the antananarivo point
  // const marker = addMarker(map, TANA_latlong);
};
