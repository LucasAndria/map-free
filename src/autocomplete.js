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

function autocomplete(inputNode, itemsArray, showOnEmpty = false) {
  let currentFocus;

  /*execute a function when someone writes in the text field:*/
  inputNode.addEventListener("input", function (e) {
    let autocompleteItems,
      autocompleteElement,
      i,
      inputValue = this.value;

    /*close any already open lists of autocompleted values*/
    closeAllLists(inputNode);

    if (!inputValue && !showOnEmpty) return;
    currentFocus = -1;

    /*create a DIV element that will contain the items (values):*/
    autocompleteItems = document.createElement("DIV");
    autocompleteItems.setAttribute("id", this.id + "autocomplete-list");
    autocompleteItems.setAttribute("class", "autocomplete-items");

    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(autocompleteItems);

    itemsArray.forEach((item) => {
      if (
        typeof item === "string" &&
        item.slice(0, inputValue.length).toUpperCase() ===
          inputValue.toUpperCase()
      ) {
        autocompleteElement = document.createElement("div");
        autocompleteElement.innerHTML = `<strong>${item.slice(
          0,
          inputValue.length
        )}</strong>`;
        autocompleteElement.innerHTML += item.slice(inputValue.length);
        autocompleteElement.innerHTML += `<input type='hidden' value='${item}'>`;
        autocompleteElement.addEventListener("click", function (e) {
          inputNode.value = this.getElementsByTagName("input")[0].value;
          closeAllLists(inputNode);
        });
        autocompleteItems.appendChild(autocompleteElement);
      }
    });

    // /*for each item in the array...*/
    // for (i = 0; i < arr.length; i++) {

    //   /*check if the array is object and the value starts with the same letters as the text field value:*/
    //   if (typeof arr[i] === "object") {
    //     if (
    //       arr[i].label.substr(0, val.length).toUpperCase() == val.toUpperCase()
    //     ) {
    //       const array_keys = Object.keys(arr[i]);
    //       /*create a DIV element for each matching element:*/
    //       b = document.createElement("DIV");
    //       /*make the matching letters bold:*/
    //       b.innerHTML =
    //         "<strong>" + arr[i].label.substr(0, val.length) + "</strong>";
    //       b.innerHTML += arr[i].label.substr(val.length);
    //       /*insert a input field that will hold the current array item's value:*/
    //       const input = document.createElement("input");
    //       input.type = "hidden";
    //       input.value = arr[i].label;
    //       array_keys.forEach((key) => {
    //         input.dataset[key] = arr[i][key];
    //       });
    //       b.appendChild(input);
    //       /*execute a function when someone clicks on the item value (DIV element):*/
    //       b.addEventListener("click", function (e) {
    //         /*insert the value for the autocomplete text field:*/
    //         inp.value = this.getElementsByTagName("input")[0].value;

    //         array_keys.forEach((key) => {
    //           inp.dataset[key] =
    //             this.getElementsByTagName("input")[0].dataset[key];
    //         });
    //         /*close the list of autocompleted values,
    //   (or any other open lists of autocompleted values:*/
    //         closeAllLists(inputNode, );
    //       });
    //       a.appendChild(b);
    //     }
    //   }
    // }
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
      currentFocus = -1;
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
