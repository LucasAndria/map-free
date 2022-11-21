import countries from "./countries";
import { autocomplete } from "../../src/index";

const stores = [
  "my store antanimena",
  "my store ankadikely",
  "my store talatamaty",
  "my store andravohangy",
];

/* 
  it add the elements in the array as a choice as the user input
  first params : id of the div that wrap the input element
  if there are many elements with that id, then it will take the first
  second params : array of string used for the autocomplete
  third params: boolean to display all choice when the input field is empty
*/

autocomplete("ac-countries", countries);

autocomplete("ac-stores", stores, true);
