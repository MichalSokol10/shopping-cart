window.onscroll = function () {
  scrollFunction();
};

var totalProducts = 0; // Total number of products in the cart

var items = []; // Array to hold products added to the cart

// Shows or hides the "Back to top" button
function scrollFunction() {
  var backToTop = document.getElementById("back-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}

// List of available products with their categories and prices
var products = [
  { name: "Beef burger", category: "Burgery", price: 199 },
  { name: "Cheese burger", category: "Burgery", price: 199 },
  { name: "Samuraj burger", category: "Burgery", price: 199 },
  { name: "Lampion burger", category: "Burgery", price: 199 },
  { name: "Lampion blue burger", category: "Burgery", price: 199 },
  { name: "Bacon burger", category: "Burgery", price: 180 },
  { name: "California burger", category: "Burgery", price: 180 },
  { name: "Tennessee burger", category: "Burgery", price: 180 },
  { name: "Texas burger", category: "Burgery", price: 180 },
  { name: "Vege burger", category: "Burgery", price: 180 },
  { name: "Hranolky", category: "Přílohy", price: 45 },
  { name: "Batátové hranolky", category: "Přílohy", price: 69 },
  { name: "Kofola", category: "Nápoje", price: 29 },
  { name: "Coca-cola", category: "Nápoje", price: 29 },
  { name: "Fanta", category: "Nápoje", price: 29 },
  { name: "Sprite", category: "Nápoje", price: 29 },
  { name: "Red Bull", category: "Nápoje", price: 45 },
  { name: "Pilsner Urquell", category: "Nápoje", price: 45 },
  { name: "Birell", category: "Nápoje", price: 35 },
  { name: "Pepsi", category: "Nápoje", price: 43 },
];

// Creates a table of products for a specific category
function createProductTable(category) {
  var table = document.createElement("table");

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (product.category === category) {
      var row = table.insertRow();
      var nameCell = row.insertCell();
      nameCell.textContent = product.name;
      var priceCell = row.insertCell();
      priceCell.textContent = product.price + ",-";

      var addButtonCell = row.insertCell();
      var addButton = document.createElement("button");
      addButton.textContent = "+";
      addButton.style.backgroundColor = "black";
      addButton.style.color = "white";
      addButton.style.fontWeight = "bold";

      // Change button color on hover
      addButton.addEventListener(
        "mouseover",
        function () {
          this.style.color = "darkgoldenrod"; 
        }
      );
      addButton.addEventListener(
        "mouseout",
        function () {
          this.style.color = "white"; 
        }
      );

      // Add product to cart on button click
      addButton.addEventListener(
        "click",
        (function (product) {
          return function () {
            addToCart(product);
          };
        })(product)
      );
      addButtonCell.appendChild(addButton);
    }
  }

  return table;
}

// Renders product tables grouped by categories
function renderProductTables() {
  var container = document.getElementById("product-container");

  container.innerHTML = "";

  var categories = {};
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  }

  var container = document.getElementById("product-container");
  for (var category in categories) {
    var productsForCategory = categories[category];

    var categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    var categoryHeader = document.createElement("h2");
    categoryHeader.textContent = category;

    categoryContainer.appendChild(categoryHeader);

    var productTable = createProductTable(category);

    categoryContainer.appendChild(productTable);
    container.appendChild(categoryContainer);
  }
}

// Adds a product to the shopping cart
function addToCart(product) {
  var cartItems = document.getElementById("cart-items");

  var row = document.createElement("tr");
  var nameCell = document.createElement("td");
  nameCell.textContent = product.name;
  var priceCell = document.createElement("td");
  priceCell.textContent = parseInt(product.price) + ",-";
  var removeButtonCell = document.createElement("td");
  var removeButton = document.createElement("button");
  removeButton.textContent = "-";
  removeButton.style.backgroundColor = "black";
  removeButton.style.color = "white";
  removeButton.style.fontWeight = "bold";

  // Add click event to remove product and update the total price
  removeButton.addEventListener("click", function () {
    removeFromCart(row);
    updateTotalPrice();
  });

  // Change button color on hover
  removeButton.addEventListener("mouseover", function () {
    removeButton.style.color = "darkgoldenrod";
  });
  removeButton.addEventListener("mouseout", function () {
    removeButton.style.color = "white";
  });

  removeButtonCell.appendChild(removeButton);

  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(removeButtonCell);

  var newItem = {
    name: product.name,
    category: product.category,
    price: product.price,
  };

  items.push(newItem);

  cartItems.appendChild(row);
  updateTotalPrice();
  totalProducts++;
  var cartItems = document.getElementById("cart-items");

  if (totalProducts > 0) {
    cartItems.style.margin = "10px auto";
    cartItems.style.marginRight = "50px";
  }
}

// Removes a product from the cart
function removeFromCart(row) {
  var cartItems = document.getElementById("cart-items");
  cartItems.removeChild(row);

  var index = items.findIndex(function (item) {
    return item.name === row.firstChild.textContent;
  });

  if (index !== -1) {
    items.splice(index, 1);
  }

  totalProducts--;
  if (totalProducts == 0) {
    cartItems.style.margin = "0px";
  }
}

var totalPrice = 0;

// Updates the total price of items in the cart
function updateTotalPrice() {
  var cartItems = document.getElementById("cart-items");
  totalPrice = 0;
  var rows = cartItems.getElementsByTagName("tr"); 

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    var cell = row.cells[1];

    var value = parseInt(cell.textContent);
    totalPrice += value;
  }

  console.log("Celková suma: " + totalPrice);

  var totalElement = document.getElementById("total-price");
  totalElement.textContent = totalPrice;
}

// Initialize product tables on page load
window.onload = function () {
  renderProductTables();
};

// Form submission handler
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("myForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    var addressInput = document.getElementById("address");
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var shippingMethodSelect = document.getElementById("shipping-method");
    var paymentSelect = document.getElementById("payment");
    var noteInput = document.getElementById("note");

    // Form validation logic
    var address = addressInput.value;

    var addressPattern = /^[^\d]+ \d+$/; 

    if (!addressPattern.test(address)) {
      alert(
        "Zadejte prosím adresu ve správném formátu (ulice [číslo popisné])."
      );
      return;
    }

    if (items.length === 0) {
      alert("Musíte vložit nějakou položku do košíku.");
      return;
    }

    var phoneNumber = phoneInput.value;

    var phonePattern = /^\d{9}$/; 

    if (!phonePattern.test(phoneNumber)) {
      alert("Zadejte prosím platné devítimístné telefonní číslo.");
      return;
    }

    if (
      !addressInput.value ||
      !nameInput.value ||
      !emailInput.value ||
      !phoneInput.value
    ) {
      alert("Vyplňte prosím všechna povinná pole.");
      return;
    }

    var formData = {
      address: addressInput.value,
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      shippingMethod: shippingMethodSelect.value,
      payment: paymentSelect.value,
      note: noteInput.value,
      items: items,
      totalPrice: totalPrice
    };

    var savedForms = localStorage.getItem("forms");
    var forms = [];

    if (savedForms) {
      forms = JSON.parse(savedForms);
    }

    forms.push(formData);

    var jsonData = JSON.stringify(forms);

    localStorage.setItem("forms", jsonData);

    form.reset();

    alert("Formulář byl úspěšně odeslán.");

    items = [];

    var cartItems = document.querySelector("#cart-items");

    cartItems.innerHTML = "";

    cartItems.style.margin = "0px";

    updateTotalPrice();
  });
});

// Handles the submission of the product form
function handleFormSubmit(event) {
  event.preventDefault(); 

  var productNameInput = document.getElementById("product-name");
  var categorySelect = document.getElementById("category");
  var priceInput = document.getElementById("price");

  var productName = productNameInput.value;
  var category = categorySelect.value;
  var price = parseFloat(priceInput.value);

  if (price <= 0) {
    alert("Cena musí být větší než 0.");
    return;
  }

  var newProduct = { name: productName, category: category, price: price };

  products.push(newProduct);

  productNameInput.value = "";
  categorySelect.selectedIndex = 0;
  priceInput.value = "";

  renderProductTables();
}

var form = document.querySelector(".product-form");
form.addEventListener("submit", handleFormSubmit);

// Scrolling for navigation links
var links = document.querySelectorAll("ul li a");

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (event) {
    event.preventDefault(); 

    var targetSelector = this.getAttribute("href"); 
    var targetElement = document.querySelector(targetSelector);

    targetElement.scrollIntoView();
  });
}
