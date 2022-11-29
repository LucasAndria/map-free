import "leaflet";
import { geocoding, autocomplete } from "../../src/index";
import blabla from "../../src/geo_autocomplete";

const formGeocoding = document.querySelector(".form-geocoding");

(async () => {
  let data = { labels: [] };
  data = await geocoding();
  blabla("auto_lieu", data.labels);
})();

// if (formGeocoding) {
//   const input = document.getElementById("recherche_lieu");

//   let autocomplete_timeout;

//   input.addEventListener("input", () => {
//     if (autocomplete_timeout) clearTimeout(autocomplete_timeout);

//     autocomplete_timeout = setTimeout(async () => {
//       const data = await geocoding();

//       autocomplete("auto_lieu", data.labels);
//     }, 1000);
//   });
// }
