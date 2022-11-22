import autocomplete from "./autocomplete";
import geocoding from "./geocoding.js";

exports.autocomplete = (containerId, array, showOnEmpty) => {
  autocomplete(containerId, array, showOnEmpty);
};

exports.geocoding = geocoding;
