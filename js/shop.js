// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  let updateProduct = products.find((product) => product.id === id);
  // 2. Add found product to the cart array

  let productInCart = findProductInCart(id);
  const productIsPresent = productInCart !== undefined;

  if (productIsPresent) {
    productInCart.quantity += 1;
  } else {
    cart.push({ ...updateProduct, quantity: 1 });
  }

  function findProductInCart(idToFind) {
    return cart.find((product) => product.id === idToFind);
  }
}

// Exercise 2
function cleanCart() {
    cart.length = 0;
    total = 0;
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  let total = 0;
  for( productCart of cart) {
    total += productCart.quantity * productCart.price;
  }
  return total;
}

// Exercise 4
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  for( let cartProduct of cart) {
    const hasOffer = cartProduct.hasOwnProperty("offer");
    if(hasOffer) {
      const isOfferApplicable = cartProduct.quantity >= cartProduct.offer.number;
      if (isOfferApplicable) {
        cartProduct.subtotalWithDiscount = calculateSubtotalWithDiscount(cartProduct);
      } else {
        if (cartProduct.hasOwnProperty("subtotalWithDiscount")) {
          cartProduct.subtotalWithDiscount = 0;
        }
      }
    }
  }
}

function calculateSubtotalWithDiscount (cartProduct) {
  let totalProductPrice =  cartProduct.quantity * cart.price;
  let totalProductDiscount = cartProduct.quantity * (cartProduct.offer.percent / 100);
  return (totalProductPrice - totalProductDiscount);
}

// Exercise 5
function printCart() {
  let rowsToDisplay = [];
  for(cartProduct of cart) {
    rowsToDisplay.push(createCartRow(cartProduct));
  }
  let productList = document.getElementById("cart_list");
  productList.innerHTML= '';
  productList.append(...rowsToDisplay);
}

function createCartRow(cartProduct) {
  let row = document.createElement('tr');
  let rowHeader = document.createElement('th');
  rowHeader.setAttribute('scope','row');
  rowHeader.textContent = cartProduct.name;

  row.append(rowHeader);

  let price = createDataCellWithText(`$${cartProduct.price}`);
  let quantity = createDataCellWithText(cartProduct.quantity);
  let totalLine = cartProduct.hasOwnProperty("subtotalWithDiscount")
    ? cartProduct.subtotalWithDiscount
    : cartProduct.price * cartProduct.quantity;

  let totalWithDiscount = createDataCellWithText(`$${totalLine}`);
  row.append(rowHeader, price, quantity, totalWithDiscount);
  
  return row;

}

function createDataCellWithText(text) {
  let tdElement = document.createElement('td');
  text = text ?? 0.00;
  tdElement.textContent = text;
  return tdElement;
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {}

function open_modal() {
  printCart();
}
