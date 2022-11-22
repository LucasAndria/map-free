import "leaflet";

const TANA_latlong = [-18.933333, 47.516667];
const MAP_ZOOM = 15;

// option for the position of the map
const options = {
  center: TANA_latlong,
  zoom: MAP_ZOOM,
};

// Create leaflet interface and controller
const map = L.map("map", options);

// // Add tile layer to the map (using openstreetmap)
// const tileLayer = L.tileLayer(
//   "https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
//   {
//     foo: "bar",
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }
// ).addTo(map);

// Add tile layer (using maptiler)
const tileLayer = L.tileLayer(
  `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${process.env.TILE_LAYER_KEY}`,
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

/* 
To remove a layer on the map (tile, marker, line, ...)
map.removeLayer(tileLayer)
*/

// Create an icon
const leafletIcon = L.icon({
  iconUrl: "./resources/leaf-green.png",
  shadowUrl: "./resources/leaf-shadow.png",
  iconSize: [38, 95],
  // iconAnchor define the point of the icon that correspond to the marker location
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [12, -90],
});

const marker = L.marker(TANA_latlong, {
  icon: leafletIcon,
  draggable: true,
}).addTo(map);

/* 
  we can create a class icon if we need to add multiple icon
  with some equal parameter
*/
// const LeafletIcon = L.Icon.extend({
//   options: {
//     shadowUrl: "./resources/leaf-shadow.png",
//     iconSize: [38, 95],
//     shadowSize: [50, 64],
//     iconAnchor: [22, 94],
//     shadowAnchor: [4, 62],
//     popupAnchor: [-3, -76],
//   },
// });

// // Add the the differents iconUrl using the created LeafletIcon class
// const greenIcon = new LeafletIcon({ iconUrl: "./resources/leaf-green.png" });
// const redIcon = new LeafletIcon({ iconUrl: "./resources/leaf-red.png" });
// const orangeIcon = new LeafletIcon({ iconUrl: "./resources/leaf-orange.png" });

// var greenMarker = L.marker(TANA_latlong, { icon: greenIcon });
// var greenMarker = L.marker(
//   TANA_latlong.map((el) => el + 0.01),
//   { icon: greenIcon }
// );
// var greenMarker = L.marker(
//   TANA_latlong.map((el) => el - 0.01),
//   { icon: greenIcon }
// );

const circle = L.circle(
  TANA_latlong.map((el) => el - 0.01),
  {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }
).addTo(map);

const poligon = L.polygon(
  [
    TANA_latlong.map((el) => el + 0.01),
    TANA_latlong.map((el) => el - 0.01),
    [-18.953333, 47.516667],
  ],
  {
    color: "green",
  }
).addTo(map);

// layer.bindPopup will add marker to the layer when we click on it
const markerPopUp = marker.bindPopup("<b>Hey there !</b> <br> I am a marker");

// the methode openPopup will show the popUp when the map load (we can chain it directly after the bindPopup)
// It only work on marker
markerPopUp.openPopup();

// we can also add popUp on circle or poligon
circle.bindPopup("I am a circle");
poligon.bindPopup("I am a poligon");

/* with geoJSON, we can add many things in the map */
// const myGeoJSON =
//   "long object of type GeoJSON that can contain line, route, marker, popup";

// L.geoJSON(myGeoJSON).addTo(map)

//scale control is the scale of the map on the srceen
L.control
  .scale({
    metric: true,
    imperial: false,
    position: "topright",
  })
  .addTo(map);

/* we can also add our own control (like a watermark of our logo) */
L.Control.Watermark = L.Control.extend({
  onAdd: function (map) {
    let img = L.DomUtil.create("img");
    img.src = "logo.png";
    img.style.width = "50px";
    return img;
  },
  onRemove: function (map) {},
});

L.control.watermark = function (opts) {
  return new L.Control.Watermark(opts);
};

const waterMark = L.control
  .watermark({
    position: "bottomleft",
  })
  .addTo(map);
