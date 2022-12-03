import axios from "axios";
// import data from "../examples/geocoding/ressources/res_autocomplete";

// Call for the autocomplete api
async function getData(value) {
  try {
    const res = await axios({
      method: "GET",
      url: `https://api.openrouteservice.org/geocode/autocomplete?api_key=${process.env.OPEN_ROUTE_SERVICE_KEY}&text=${value}`,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function addActive(items, currentFocus) {
  if (!items) return;
  removeActive(items);
  if (currentFocus >= items.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = items.length - 1;
  /*add class "autocomplete-active":*/
  items[currentFocus].classList.add("autocomplete-active");
}

function removeActive(items) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("autocomplete-active");
  }
}

function closeAllLists(inputNode, element) {
  const items = document.getElementsByClassName("autocomplete-items");

  for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
    if (element !== items[i] && element !== inputNode) {
      items[i].parentNode.removeChild(items[i]);
    }
  }
}

function autocomplete(inputNode) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  let currentFocus;

  /* Timeout for the input field */
  let autocomplete_timeout;

  /*execute a function when someone writes in the text field:*/
  inputNode.addEventListener("input", function (e) {
    // Reset the timeout if there are any
    if (autocomplete_timeout) clearTimeout(autocomplete_timeout);
    let autocompleteItems,
      autocompleteElement,
      inputValue = this.value;

    /*close any already open lists of autocompleted values
    and remove latlng dataset */
    closeAllLists(inputNode);
    inputNode.dataset.latlng = "";

    if (!inputValue) return;

    autocomplete_timeout = setTimeout(async () => {
      currentFocus = -1;

      /*create a DIV element that will contain the items (values):*/
      autocompleteItems = document.createElement("DIV");
      autocompleteItems.setAttribute("id", this.id + "autocomplete-list");
      autocompleteItems.setAttribute("class", "autocomplete-items");

      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(autocompleteItems);

      /* get the autocomplete data from the API */
      const data = await getData(e.target.value);

      /* Create an array that will contains all the refactored data */
      const itemsArray = data.features.map((el) => {
        return {
          label: el.properties.label,
          latlng: el.geometry.coordinates,
        };
      });

      itemsArray.forEach((item) => {
        const matchItem = item.label.slice(0, inputValue.length);

        if (matchItem.toUpperCase() === inputValue.toUpperCase()) {
          autocompleteElement = document.createElement("div");
          autocompleteElement.innerHTML = `<strong>${item.label.slice(
            0,
            inputValue.length
          )}</strong>`;
          autocompleteElement.innerHTML += item.label.slice(inputValue.length);

          const input = document.createElement("input");
          input.type = "hidden";
          input.value = item.label;
          input.dataset.latlng = item.latlng;

          autocompleteElement.appendChild(input);
          autocompleteItems.appendChild(autocompleteElement);

          autocompleteElement.addEventListener("click", function (e) {
            const hiddenInput = this.getElementsByTagName("input")[0];
            inputNode.value = hiddenInput.value;
            inputNode.dataset.latlng = hiddenInput.dataset.latlng;

            closeAllLists(inputNode);
          });
        }
      });
    }, 1500);
  });

  /*execute a function presses a key on the keyboard:*/
  inputNode.addEventListener("keydown", function (e) {
    let element = document.getElementById(this.id + "autocomplete-list");
    if (element) element = element.getElementsByTagName("div");

    /* key DOWN pressed */
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(element, currentFocus);
      return;
    }

    /* key UP pressed */
    if (e.keyCode === 38) {
      currentFocus--;
      addActive(element, currentFocus);
      return;
    }

    /* enter pressed */
    if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus < 0) return;
      if (element) element[currentFocus].click();
      return;
    }
  });

  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(inputNode, e.target);
  });
}

/*  exported function controller
get the input on the DOM inside the div container
verify data */
export default (container_id) => {
  const container = document.getElementById(container_id);
  if (!container || container.tagName.toLowerCase() !== "div") return;

  container.classList.add("autocomplete");

  const container_children = container.children;
  if (!container_children) return;

  let input;
  for (let i = 0; i < container_children.length; i++) {
    if (container_children[i].tagName.toLowerCase() === "input") {
      input = container_children[i];
      break;
    }
  }

  autocomplete(input);
};
