import "leaflet";
import geo_autocomplete from "../../src/geo_autocomplete";

const formGeocoding = document.querySelector(".form-geocoding");

// (async () => {
//   let data = { labels: [] };
//   data = await geocoding();
//   blabla("auto_lieu", data.labels);
// })();

if (formGeocoding) {
  const input = document.getElementById("recherche_lieu");

  geo_autocomplete("autocomplete_container");
}
