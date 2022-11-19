import "leaflet-routing-machine";

// Trace a route from one point to another point
exports.addRoute = (map, latlngA, latlngB) => {
  [latA, lngA] = latlngA;
  [latB, lngB] = latlngB;

  // Add route to the map
  L.Routing.control({
    waypoints: [L.latLng(latA, lngA), L.latLng(latB, lngB)],
  }).addTo(map);
};
