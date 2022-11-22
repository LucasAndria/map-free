import autocomplete from "./autocomplete";
import routing from "./routing";

exports.autocomplete = (containerId, array, showOnEmpty) => {
  autocomplete(containerId, array, showOnEmpty);
};

exports.myRouting = (startPoint, endPoint, profile) => {
  return routing(startPoint, endPoint, profile);
};
