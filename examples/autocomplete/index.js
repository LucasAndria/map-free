import countries from "./countries";
import { autocomplete } from "../../src/index";

const stores = [
  "my store antanimena",
  "my store ankadikely",
  "my store talatamaty",
  "my store andravohangy",
];

const arrays_object = [
  { label: "abc", latitude: 2.555, longitude: 5.555 },
  { label: "ika", latitude: 2.555, longitude: 5.555 },
  { label: "okoa", latitude: 2.555, longitude: 5.555 },
  { label: "oii", latitude: 2.555, longitude: 5.555 },
];

/* 
  it add the elements in the array as a choice as the user input
  first params : id of the div that wrap the input element
  if there are many elements with that id, then it will take the first.
  second params : array of string or object used for the autocomplete
  third params: boolean, display all choice when the input field is empty
*/

autocomplete("ac-countries", countries);

// autocomplete("ac-stores", stores, true);

autocomplete("ac-stores", arrays_object);
