exports.createLeafletInterface = (domId, options) => {
  const map = domId || "map";
  const mapOptions = options || { center: [-18.933333, 47.516667], zoom: 11 };

  // Setup the map properties for leaflet
  return L.map(map, mapOptions);
};

exports.addTiler = (map, TileLayer, options) => {
  // Add Tiles from openstreetmap if no Tiles given
  const mapLayer =
    TileLayer || "https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}";

  // Options like attributions
  const mapOptions = options || {};

  // Add tiles to the map
  L.tileLayer(mapLayer, mapOptions).addTo(map);
};

exports.addMarker = (map, latlong, icon) => {
  const markerIcon = icon || {};

  // Add marker
  return L.marker(latlong, markerIcon).addTo(map);
};

exports.showPopup = (marker, text) => {
  const popup = text || "Hello...";
  // Add popup
  marker.bindPopup(popup).openPopup();
};
