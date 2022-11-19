import "leaflet";
import {
  addTiler,
  createLeafletInterface,
  addMarker,
  showPopup,
} from "./leaflet";

const TANA_latlong = [-18.933333, 47.516667];
const MAP_ZOOM = 15;

const mapOptions = {
  center: TANA_latlong,
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

// ADD marker to the antananarivo point
const marker = addMarker(map, TANA_latlong);

// Display a popUp to a marker
showPopup(marker, "<b> Hello </b></br> I am a marker.");
