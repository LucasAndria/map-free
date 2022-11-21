import countries from "./countries";
import { autocomplete } from "../../src/index";

const stores = [
  "my store antanimena",
  "my store ankadikely",
  "my store talatamaty",
  "my store andravohangy",
];

autocomplete("ac-countries", countries);
autocomplete("ac-stores", stores, true);
