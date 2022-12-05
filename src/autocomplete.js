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
    if (element !== items[i] && element !== inputNode) {
      items[i].parentNode.removeChild(items[i]);
    }
  }
}

/* main function */
function autocomplete(inputNode, itemsArray, showOnEmpty = false) {
  /* create a div for the loader */
  const loader = document.createElement("div");
  loader.setAttribute("class", "autocomplete-loader autocomplete-hide");

  inputNode.after(loader);

  let currentFocus;

  /*execute a function when someone writes in the text field:*/
  inputNode.addEventListener("input", function (e) {
    loader.classList.replace("autocomplete-hide", "autocomplete-show");
    let autocompleteItems,
      autocompleteElement,
      inputValue = this.value;

    /*close any already open lists of autocompleted values*/
    closeAllLists(inputNode);

    if (!inputValue && !showOnEmpty)
      return loader.classList.replace("autocomplete-show", "autocomplete-hide");

    currentFocus = -1;

    /*create a DIV element that will contain the items (values):*/
    autocompleteItems = document.createElement("div");
    autocompleteItems.setAttribute("id", this.id + "autocomplete-list");
    autocompleteItems.setAttribute("class", "autocomplete-items");

    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(autocompleteItems);

    itemsArray.forEach((item) => {
      /* take the first part of the array that 
      match the length of the input value */
      let matchItem;
      if (typeof item === "string")
        matchItem = item.slice(0, inputValue.length);

      if (typeof item === "object")
        matchItem = item.label.slice(0, inputValue.length);

      // if items is array of String
      if (
        typeof item === "string" &&
        matchItem.toUpperCase() === inputValue.toUpperCase()
      ) {
        autocompleteElement = document.createElement("div");
        autocompleteElement.innerHTML = `<strong>${item.slice(
          0,
          inputValue.length
        )}</strong>`;
        autocompleteElement.innerHTML += item.slice(inputValue.length);

        const input = document.createElement("input");
        input.type = "hidden";
        input.value = item;

        autocompleteElement.appendChild(input);
        autocompleteItems.appendChild(autocompleteElement);

        autocompleteElement.addEventListener("click", function (e) {
          inputNode.value = this.getElementsByTagName("input")[0].value;
          closeAllLists(inputNode);
        });
      }

      // if items is array of object
      if (
        typeof item === "object" &&
        matchItem.toUpperCase() === inputValue.toUpperCase()
      ) {
        const array_keys = Object.keys(item);
        autocompleteElement = document.createElement("div");
        autocompleteElement.innerHTML = `<strong>${item.label.slice(
          0,
          inputValue.length
        )}</strong>`;
        autocompleteElement.innerHTML += item.label.slice(inputValue.length);

        const input = document.createElement("input");
        input.type = "hidden";
        input.value = item.label;

        array_keys.forEach((key) => {
          input.dataset[key] = item[key];
        });

        autocompleteElement.appendChild(input);
        autocompleteItems.appendChild(autocompleteElement);

        autocompleteElement.addEventListener("click", function (e) {
          const hiddenInput = this.getElementsByTagName("input")[0];
          inputNode.value = hiddenInput.value;

          array_keys.forEach((key) => {
            inputNode.dataset[key] = hiddenInput.dataset[key];
          });

          closeAllLists(inputNode);
        });
      }
    });

    loader.classList.replace("autocomplete-show", "autocomplete-hide");
  });

  /*execute a function presses a key on the keyboard:*/
  inputNode.addEventListener("keydown", function (e) {
    let element = document.getElementById(this.id + "autocomplete-list");
    if (element) element = element.getElementsByTagName("div");

    /* key DOWN pressed */
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(element, currentFocus);
    }

    /* key UP pressed */
    if (e.keyCode === 38) {
      currentFocus--;
      addActive(element, currentFocus);
    }

    /* enter pressed */
    if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus < 0) return;
      if (element) element[currentFocus].click();
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
export default (container_id, array, showOnEmpty) => {
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

  autocomplete(input, array, showOnEmpty);
};
