import "leaflet";
import geo_autocomplete from "../../src/geo_autocomplete";

const formGeocoding = document.querySelector(".form-geocoding");

if (formGeocoding) {
  geo_autocomplete("autocomplete_container");
}
