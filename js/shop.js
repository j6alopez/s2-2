// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
// var products = [];
// loadProducts(products);
// function loadProducts(products) {
//   fetch('./../data/products.json')
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       data.forEach((product) => products.push(product));
//     });
// }

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
var totalCartQuantity = 0;


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

  totalCartQuantity += 1;
  updateCountProduct();
}

// Exercise 2
function cleanCart() {
  cart.length = 0;
  total = 0;
  totalCartQuantity = 0;

  document.getElementById("cart_list").innerHTML = '';
  document.getElementById('total_price').textContent = 0;

  updateCountProduct();
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  let total = 0;
  for (const cartProduct of cart) {
    let linePrice = cartProduct.hasOwnProperty("subtotalWithDiscount")
      ? cartProduct.subtotalWithDiscount
      : cartProduct.quantity * cartProduct.price;

    total += linePrice;
  }
  return total;
}

// Exercise 4
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  for (let cartProduct of cart) {
    const hasOffer = cartProduct.hasOwnProperty("offer");
    if (hasOffer) {
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

function calculateSubtotalWithDiscount(cartProduct) {
  let totalProductPrice = cartProduct.quantity * cartProduct.price;
  let totalProductDiscount = totalProductPrice * (cartProduct.offer.percent / 100);

  return totalProductPrice - totalProductDiscount;
}

// Exercise 5
function printCart() {
  applyPromotionsCart();
  let productLines = [];

  cart.forEach(cartProduct => {
    const lineProduct = createLine(cartProduct);
    productLines.push(lineProduct);
  })

  let productList = document.getElementById("cart_list");
  productList.innerHTML = '';
  productList.append(...productLines);

  let totalPrice = document.getElementById('total_price');
  totalPrice.textContent = calculateTotal();

}

function createLine(cartProduct) {

  const applySubtotalWithDiscount =
    cartProduct.hasOwnProperty("subtotalWithDiscount") &&
    cartProduct.subtotalWithDiscount > 0;

    let totalLine = applySubtotalWithDiscount
      ? cartProduct.subtotalWithDiscount
      : cartProduct.price * cartProduct.quantity;
  
  const price = createDataCellWithText(`$${cartProduct.price}`);
  const quantity = createDataCellWithText(cartProduct.quantity);
  const totalWithDiscount = createDataCellWithText(`$${totalLine}`);

  let rowHeader = document.createElement("th");
  rowHeader.scope = 'row';
  rowHeader.textContent = cartProduct.name;

  let row = document.createElement("tr");
  row.append(rowHeader, price, quantity, totalWithDiscount);

  return row;
}

function createDataCellWithText(text) {
  let tdElement = document.createElement("td");
  text = text ?? 0.0;
  tdElement.textContent = text;

  return tdElement;
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
  cartProduct = cart.find(cartProduct => cartProduct.id === id);
  if (cartProduct === undefined) {
    return;
  }
  let removeProduct = cartProduct.quantity === 1;
  if (removeProduct) {
    let index = cart.indexOf(cartProduct);
    cart.splice(index, 1);
  } else {
    cartProduct.quantity -= 1;
  }
  totalCartQuantity -= 1;
  updateCountProduct();
}

function open_modal() {
  printCart();
}

//Custom functions
function loadProducts(products) {
  fetch('./../data/products.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((product) => products.push(product));
    });

}

function findProductInCart(idToFind) {
  return cart.find((product) => product.id === idToFind);
}

function updateCountProduct() {
  document.getElementById('count_product').textContent = totalCartQuantity;
}
