import "leaflet-routing-machine";

const controlEventPromise = (control) => {
  return new Promise((resolve, reject) => {
    control.on("routesfound", (data) => resolve(data));
    control.on("routingerror", (err) =>
      reject(`routing error : ${err.error.message}`)
    );
  });
};

// Draw a route from one point to another point
exports.addRoute = async (map, latlngA, latlngB, controller = true) => {
  const [latA, lngA] = latlngA;
  const [latB, lngB] = latlngB;
  const data = { distance: 0, time: 0, routes: [] };
  let error = null;

  // Create route params and controls
  let control = L.Routing.control({
    waypoints: [L.latLng(latA, lngA), L.latLng(latB, lngB)],

    lineOptions: {
      addWaypoints: false,
    },
  });

  // When routing starts
  control.on("routingstart", function (e) {});

  // Add the control to the map
  control.addTo(map);

  // Remove the routing container (must be after adding control)
  if (!controller) {
    document.querySelector(".leaflet-routing-container").style.display = "none";
  }

  try {
    const dataFromEvent = await controlEventPromise(control);
    document.querySelector(".leaflet-routing-container").style.display = "none";
    const routes = dataFromEvent.routes;
    const summary = routes[0].summary;

    data.routes = routes.map((route) => {
      return { instructions: route.instructions, name: route.name };
    });

    data.distance = Math.round(summary.totalDistance / 10) / 100;
    data.time = Math.round(((summary.totalTime % 3600) / 60) * 100) / 100;
  } catch (err) {
    console.log(err);
    error = err;
  }

  return [control, data, error];
};

exports.deleteRoute = (map, control) => {
  map.removeControl(control);
};
