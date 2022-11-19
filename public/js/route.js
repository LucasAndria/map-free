import "leaflet-routing-machine";
import { selectorPromise } from "./await-dom-query";

// Trace a route from one point to another point
exports.addRoute = async (map, latlngA, latlngB) => {
  const [latA, lngA] = latlngA;
  const [latB, lngB] = latlngB;
  const data = {};

  // Create route params and controls
  let control = L.Routing.control({
    waypoints: [L.latLng(latA, lngA), L.latLng(latB, lngB)],
  });

  // Add the control to the map
  control.addTo(map);

  const routingContainer = document.querySelector(".leaflet-routing-container");

  try {
    const routingAlt = await selectorPromise(".leaflet-routing-alt");

    data.distance = routingAlt.children[1].innerText.split(",")[0];
    data.time = routingAlt.children[1].innerText.split(",")[1];
    data.header = routingAlt.children[0].innerText;
  } catch {
    console.log("ERROR!!!");
  }
  // setTimeout(() => {
  //   const routingAlt = document.querySelector(".leaflet-routing-alt");

  //   console.log(routingAlt);
  // }, 2000);

  return [control, data];
};

exports.deleteRoute = (map, control) => {
  map.removeControl(control);
};
