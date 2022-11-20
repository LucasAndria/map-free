// // Base map with marker and popup
// import "./base-map";

// // Marker with route
// import "./display-route";
// import { traceRoute, removeRoute } from "./display-route";

// For stores
// import "./store-map";
// import { autoComplete, addRoute, deleteRoute } from "./store-map";

// For autocomplete
import "./leaflet-auto-complete";
import { geoCode } from "./leaflet-auto-complete";

/* Here is all the DOM controls */

const formPointToPoint = document.querySelector(".form_point-to-point");
const formStores = document.querySelector(".form_client-to-stores");
const formAC = document.querySelector(".form_autocomplete");

// if the form point to point is present on the DOM
if (formPointToPoint) {
  let leafletRoute;
  formPointToPoint.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (leafletRoute) removeRoute(leafletRoute);

    // Get the value from input (later change into STRING)
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    // Convert value into latlng (later will be geoCoding)
    from = JSON.parse(from);
    to = JSON.parse(to);

    // Trace a route from point A to B
    // traceRoute([-18.933333, 47.516667], [-18.95, 47.58]);
    const [control, data, error] = await traceRoute(from, to, false);

    console.log(control);
  });
}

// If the form store appear
if (formStores) {
  const user = document.getElementById("from");
  const store = document.getElementById("to");
  autoComplete(store);

  function positionSuccess(data) {
    user.value = JSON.stringify([data.coords.latitude, data.coords.longitude]);
  }

  function positionFail() {
    console.log("Fail");
  }

  document.getElementById("me").addEventListener("click", (e) => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionFail);
  });

  let leafletRoute;

  formStores.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (leafletRoute) deleteRoute(leafletRoute);
    // Get the value from input (later change into STRING)
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    // Convert value into latlng (later will be geoCoding)
    from = JSON.parse(from);
    // to = JSON.parse(to);

    // Trace a route from point A to B
    // traceRoute([-18.933333, 47.516667], [-18.95, 47.58]);
    [leafletRoute, data, error] = await addRoute(from, to, false);

    console.log(error);
  });
}

if (formAC) {
  formAC.addEventListener("submit", (e) => {
    e.preventDefault();

    const request = document.getElementById("ac-input").value;
    geoCode(request);
  });
}
