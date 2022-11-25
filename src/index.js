import autocomplete from "./autocomplete";
import geocoding from "./geocoding.js";
import routing from "./routing";

exports.autocomplete = (containerId, array, showOnEmpty) => {
  autocomplete(containerId, array, showOnEmpty);
};

exports.geocoding = geocoding;
exports.myRouting = routing;