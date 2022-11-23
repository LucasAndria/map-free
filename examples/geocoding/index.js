import "leaflet";
import { geocoding, autocomplete } from "../../src/index";

const formGeocoding = document.querySelector(".form-geocoding");

(async () => {
  const input = document.getElementById("recherche_lieu");
  let data = { labels: [] };
  input.addEventListener("input", async () => {
    data = await geocoding();
    autocomplete("auto_lieu", data.labels);
  });
})();

// if (formGeocoding) {
//   const input = document.getElementById("recherche_lieu");

//   let autocomplete_timeout;

//   input.addEventListener("input", () => {
//     if (autocomplete_timeout) clearTimeout(autocomplete_timeout);

//     autocomplete_timeout = setTimeout(async () => {
//       const data = await geocoding();

//       console.log("ok");
//       autocomplete("auto_lieu", data.labels);
//     }, 1000);
//   });
// }
