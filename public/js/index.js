import "./bases";
import { traceRoute } from "./bases";

const formMapRoute = document.querySelector(".form-controller");

if (formMapRoute) {
  formMapRoute.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the value from input (later change into STRING)
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    // Convert value into latlng (later will be geoCoding)
    from = JSON.parse(from);
    to = JSON.parse(to);

    console.log("from : ", from);
    console.log("to : ", to);

    // Trace a route from point A to B
    // traceRoute([-18.933333, 47.516667], [-18.95, 47.58]);
    traceRoute(from, to);
  });
}
