import "./init-map";
import { traceRoute, removeRoute } from "./init-map";

/* Here is all the DOM controls */

const formMapRoute = document.querySelector(".form-controller");

if (formMapRoute) {
  let leafletRoute;
  formMapRoute.addEventListener("submit", async (e) => {
    if (leafletRoute) removeRoute(leafletRoute);

    e.preventDefault();

    // Get the value from input (later change into STRING)
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    // Convert value into latlng (later will be geoCoding)
    from = JSON.parse(from);
    to = JSON.parse(to);

    // Trace a route from point A to B
    // traceRoute([-18.933333, 47.516667], [-18.95, 47.58]);
    [leafletRoute, data] = await traceRoute(from, to);

    console.log(data);
  });
}
