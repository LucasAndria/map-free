import axios from "axios";

/*  exported function controller
get the input on the DOM inside the div container
verify data */
export default (container_id, action = {}) => {
  /* get the container in the DOM that match the container_id */
  const container = document.getElementById(container_id);
  if (!container || container.tagName.toLowerCase() !== "div")
    return console.log("container id not found or is not a div");

  container.classList.add("autocomplete");
  container.style.width = "fit-content";

  /* get all the children of the container */
  const container_children = container.children;

  /* search for the input child */
  let input;
  for (let i = 0; i < container_children.length; i++) {
    if (container_children[i].tagName.toLowerCase() === "input") {
      input = container_children[i];
      break;
    }
  }

  if (!input) return console.log("no input found in the container");

  autocomplete(input, action);
};

/* main function for the autocomplete of geocoding */
function autocomplete(inputNode, action) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  let currentFocus;

  /* Timeout for the input field */
  let autocomplete_timeout;

  /* get the height of the selected input node  */
  const inputHeight = inputNode.clientHeight;
  const inputWidth = inputNode.clientWidth;

  /* create a div for the loader */
  const loader = document.createElement("div");

  /* style for the loading */
  loader.style.width = `${(60 / 100) * inputHeight}px`;
  loader.style.height = `${(60 / 100) * inputHeight}px`;
  loader.style.marginLeft = `${inputWidth - inputHeight}px`;
  loader.style.marginTop = `${-inputHeight}px`;
  loader.style.border = `${inputHeight < 20 ? 3 : 5}px solid #f3f3f3`;
  loader.style.borderTop = `${inputHeight < 20 ? 3 : 5}px solid #3498db`;
  loader.style.borderRadius = "50%";
  loader.style.animation = "spin 2s linear infinite";
  loader.style.display = "none";

  /* add the loader after the input */
  inputNode.after(loader);

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
      /* show the loader */
      loader.style.display = "block";

      /*create a DIV element that will contain the items (values):*/
      autocompleteItems = document.createElement("DIV");
      autocompleteItems.setAttribute("id", this.id + "autocomplete-list");
      autocompleteItems.setAttribute("class", "autocomplete-items");

      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(autocompleteItems);

      /* get the autocomplete data from the API */
      const data = await getData(e.target.value);

      /* hide the loader after data has been requested */
      loader.style.display = "none";

      /* stop the function if there was an error */
      if (data.statusText === "fail") {
        return data.handledError
          ? showError(autocompleteItems, data.message)
          : showError(autocompleteItems, "error occured !");
      }

      /* show message if text could not be autocompleted */
      if (data.features.length <= 0) {
        showError(autocompleteItems, "no result found !");
        return;
      }

      /* Create an array that will contains all the data needed */
      const itemsArray = data.features.map((el) => {
        return {
          label: el.properties.label,
          latlng: el.geometry.coordinates,
        };
      });

      itemsArray.forEach((item) => {
        /* text that match the text inputed */
        const matchItem = item.label.slice(0, inputValue.length);

        if (matchItem.toUpperCase() === inputValue.toUpperCase()) {
          autocompleteElement = document.createElement("div");
          autocompleteElement.innerHTML = `<strong>${matchItem}</strong>`;
          autocompleteElement.innerHTML += item.label.slice(inputValue.length);

          /* create an hidden input to store data */
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

            /* call function action.selected if there is */
            action.selected?.(item);
            return;
          });
        }
      });
    }, 1000);
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

/* Function to handle all error */
function handleError(err) {
  if (err.message === "Network Error") {
    return {
      handledError: true,
      statusText: "fail",
      message: "unable to connect !",
    };
  }

  return {
    handledError: false,
    statusText: "fail",
    message: "Error occured !",
  };
}

/* Call for the autocomplete api */
async function getData(value) {
  try {
    const res = await axios({
      method: "GET",
      url: `https://api.openrouteservice.org/geocode/autocomplete?api_key=${process.env.OPEN_ROUTE_SERVICE_KEY}&text=${value}`,
    });
    if (res.statusText !== "OK") {
      throw { status: "fail", message: "Error occured!" };
    }
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

/* add active style on the selected item */
function addActive(items, currentFocus) {
  if (!items) return;
  removeActive(items);
  if (currentFocus >= items.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = items.length - 1;
  /*add class "autocomplete-active":*/
  items[currentFocus].classList.add("autocomplete-active");
}

/* remove active style */
function removeActive(items) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("autocomplete-active");
  }
}

/* undisplay lists of items */
function closeAllLists(inputNode, element) {
  const items = document.getElementsByClassName("autocomplete-items");

  for (let i = 0; i < items.length; i++) {
    if (element !== items[i] && element !== inputNode)
      items[i].parentNode.removeChild(items[i]);
  }
}

/* message to show after the input autocomplete */
function showError(autocompleteItems, message = "error occured!") {
  const messageElement = document.createElement("div");
  messageElement.setAttribute("style", "color: red; font-size: 12px;");
  messageElement.innerHTML = message;

  if (typeof autocompleteItems !== "object") return;
  if (!autocompleteItems.classList.contains("autocomplete-items")) return;

  autocompleteItems.appendChild(messageElement);
}
