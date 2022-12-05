import "leaflet";
import geo_autocomplete from "../../src/geo_autocomplete";

function onSelected(data) {
  console.log(data);
}
const action = {
  selected: onSelected,
};

geo_autocomplete("autocomplete_container", action);
