// Keeps track of produce
var cart = [
  ["banana", 0],
  ["cauliflower", 0],
  ["loquat", 0],
];

var itemPrice = [
  ["banana", 0],
  ["cauliflower", 0],
  ["loquat", 0],
];

var totalInCart = 0;

var submitted = false; // Checks if form has been submitted or not

var orderNumber;

// True = Going TO zero. False = Going FROM zero
var bExit = false;
var cExit = false;
var lExit = false;

$(document).ready(function () {
  // RESPONSIVE JS
  var responsiveNavOpen = false;
  $(".responsive-nav").click(function () {
    if (!responsiveNavOpen) {
      $(".responsive-nav-open").css("display", "flex");
      $(".responsive-nav-open").removeClass(
        "animate__animated animate__fadeOutLeft animate__faster"
      );
      $(".responsive-nav-open").addClass(
        "animate__animated animate__fadeInLeft animate__faster"
      );
      responsiveNavOpen = true;
    } else if (responsiveNavOpen) {
      $(".responsive-nav-open").removeClass(
        "animate__animated animate__fadeInLeft animate__faster"
      );
      $(".responsive-nav-open").addClass(
        "animate__animated animate__fadeOutLeft animate__faster"
      );
      responsiveNavOpen = false;
    }
  });

  // Checks if there is stored array cart in local storage
  if (isThereLocalArray()) {
    cart = JSONtoArray();
    console.log(cart);
    updatePage();
  }
  // Updates number in cart
  $(".add-to-cart-link").click(function () {
    numInCart();
    if (totalInCart < 0) {
      totalInCart = 0;
    }
    arrayToLocalStorage(cart); // Stores to local storage every click
    adjustPosition();

    $(".num-in-cart").text(totalInCart);
  });

  // Clear cart on return-home-button press
  $(
    ".return-home-button, .checkout-link-list .item-link, .checkout-site-title"
  ).click(function () {
    cart = [
      ["banana", 0],
      ["cauliflower", 0],
      ["loquat", 0],
    ];
    itemPrice = [
      // Resets itemPrice array
      ["banana", 0],
      ["cauliflower", 0],
      ["loquat", 0],
    ];
    arrayToLocalStorage(cart);
    updatePage();
    submitted = false; // Resets the submit button
    window.location.href = "index.html";
  });

  function numInCart() {
    let bNum = cart[0][1];
    let cNum = cart[1][1];
    let lNum = cart[2][1];
    if (bNum < 0) {
      bNum = 0;
    }
    if (cNum < 0) {
      cNum = 0;
    }
    if (lNum < 0) {
      lNum = 0;
    }
    totalInCart = bNum + cNum + lNum;
  }

  $(".banana-button").click(function () {
    if (cart[0][1] <= 0 && !bExit) {
      cart[0][1]++;
      $(".banana-number").text(cart[0][1]);
      $(
        ".banana-button > .product-button > .plus-sign, .banana-button > .product-button > .minus-sign"
      ).css("display", "flex");
      $(".banana-button > .product-button > .plus-sign").css(
        "border-right",
        "solid 1px black"
      );
      $(".banana-button > .product-button > .minus-sign").css(
        "border-left",
        "solid 1px black"
      );
      $(".banana-button > .product-button").css(
        "justify-content",
        "space-between"
      );
      $(".banana-button").removeClass("link-hover");
      bExit = true;
    } else {
      bExit = false;
    }
  });
  $(".cauliflower-button").click(function () {
    if (cart[1][1] <= 0 && !cExit) {
      cart[1][1]++;
      $(".cauliflower-number").text(cart[1][1]);
      $(
        ".cauliflower-button > .product-button > .plus-sign, .cauliflower-button > .product-button > .minus-sign"
      ).css("display", "flex");
      $(".cauliflower-button > .product-button > .plus-sign").css(
        "border-right",
        "solid 1px black"
      );
      $(".cauliflower-button > .product-button > .minus-sign").css(
        "border-left",
        "solid 1px black"
      );
      $(".cauliflower-button > .product-button").css(
        "justify-content",
        "space-between"
      );
      $(".cauliflower-button").removeClass("link-hover");
      cExit = true;
    } else {
      cExit = false;
    }
  });
  $(".loquat-button").click(function () {
    if (cart[2][1] <= 0 && !lExit) {
      cart[2][1]++;
      $(".loquat-number").text(cart[2][1]);
      $(
        ".loquat-button > .product-button > .plus-sign, .loquat-button > .product-button > .minus-sign"
      ).css("display", "flex");
      $(".loquat-button > .product-button > .plus-sign").css(
        "border-right",
        "solid 1px black"
      );
      $(".loquat-button > .product-button > .minus-sign").css(
        "border-left",
        "solid 1px black"
      );
      $(".loquat-button > .product-button").css(
        "justify-content",
        "space-between"
      );
      $(".loquat-button").removeClass("link-hover");
    } else {
      lExit = false;
    }
  });

  // Adding additional products
  $(".banana-button > .product-button > .plus-sign").click(function () {
    $(".banana-number").text(addProduct(0));
  });
  $(".cauliflower-button > .product-button > .plus-sign").click(function () {
    $(".cauliflower-number").text(addProduct(1));
  });
  $(".loquat-button > .product-button > .plus-sign").click(function () {
    $(".loquat-number").text(addProduct(2));
  });

  $(".banana-button > .product-button > .minus-sign").click(function () {
    bExit = true;
    $(".banana-number").text(removeProduct(0, bExit));
  });
  $(".cauliflower-button > .product-button > .minus-sign").click(function () {
    cExit = true;
    $(".cauliflower-number").text(removeProduct(1, cExit));
  });
  $(".loquat-button > .product-button > .minus-sign").click(function () {
    lExit = true;
    $(".loquat-number").text(removeProduct(2, lExit));
  });

  // If holding mouse down on plus/minus
  var ticksDown = 0; // Number of ticks while held down (1 tick per 100ms)
  var ticking = 0; // Tick counter
  $(".banana-button > .product-button > .plus-sign")
    .on("mousedown touchstart", function (e) {
      ticksDown = setInterval(function () {
        $(".banana-number").text(cart[0][1] + ticking++);
      }, 100);
    })
    .bind("mouseup mouseleave touchend", function () {
      clearInterval(ticksDown);
      cart[0][1] += ticking;
      ticking = 0;
    });

  $(".cauliflower-button > .product-button > .plus-sign")
    .on("mousedown touchstart", function (e) {
      ticksDown = setInterval(function () {
        $(".cauliflower-number").text(cart[1][1] + ticking++);
      }, 100);
    })
    .bind("mouseup mouseleave touchend", function () {
      clearInterval(ticksDown);
      cart[1][1] += ticking;
      ticking = 0;
    });

  $(".loquat-button > .product-button > .plus-sign")
    .on("mousedown touchstart", function (e) {
      ticksDown = setInterval(function () {
        $(".loquat-number").text(cart[2][1] + ticking++);
      }, 100);
    })
    .bind("mouseup mouseleave touchend", function () {
      clearInterval(ticksDown);
      cart[2][1] += ticking;
      ticking = 0;
    });

  $(".banana-button > .product-button > .minus-sign")
    .on("mousedown touchstart", function (e) {
      ticksDown = setInterval(function () {
        if (cart[0][1] > 1) {
          $(".banana-number").text(removeProduct(0, bExit));
        } else {
          $(".banana-number").text(0);
          cart[0][1] = 1; // Ensures the if statement returns true for removeProduct function
        }
      }, 100);
    })
    .bind("mouseup mouseleave touchend", function () {
      clearInterval(ticksDown);
    });

  $(".cauliflower-button > .product-button > .minus-sign")
    .on("mousedown touchstart", function (e) {
      ticksDown = setInterval(function () {
        if (cart[1][1] > 1) {
          $(".cauliflower-number").text(removeProduct(1, cExit));
        } else {
          $(".cauliflower-number").text(0);
          cart[1][1] = 1; // Ensures the if statement returns true for removeProduct function
        }
      }, 100);
    })
    .bind("mouseup mouseleave touchend", function () {
      clearInterval(ticksDown);
    });

  $(".loquat-button > .product-button > .minus-sign")
    .on("mousedown touchstart", function (e) {
      ticksDown = setInterval(function () {
        if (cart[2][1] > 1) {
          $(".loquat-number").text(removeProduct(2, lExit));
        } else {
          $(".loquat-number").text(0);
          cart[2][1] = 1; // Ensures the if statement returns true for removeProduct function
        }
      }, 100);
    })
    .bind("mouseup mouseleave touchend", function () {
      clearInterval(ticksDown);
    });

  // Clearing cart button function
  $(".clear-cart").click(function () {
    cart = [
      ["banana", 0],
      ["cauliflower", 0],
      ["loquat", 0],
    ];
    for (let i = 0; i < cart.length; i++) {
      let className = cart[i][0];
      $("." + className + "-number").text("???????????????");
      $(
        "." +
          className +
          "-button > .product-button > .plus-sign, ." +
          className +
          "-button > .product-button > .minus-sign"
      ).css("display", "none");
      $("." + className + "-button > .product-button > .plus-sign").css(
        "border-right",
        "none"
      );
      $("." + className + "-button > .product-button > .minus-sign").css(
        "border-left",
        "none"
      );
      $("." + className + "-button > .product-button").css(
        "justify-content",
        "center"
      );
      $("." + className + "-button").addClass("link-hover");
    }

    arrayToLocalStorage(cart);
    updatePage();
  });

  // Adds 1 to selected prodcut
  function addProduct(product) {
    cart[product][1]++;
    return cart[product][1];
  }

  function removeProduct(product, exit) {
    cart[product][1]--;
    var className = cart[product][0];
    if (cart[product][1] == 0 && exit) {
      $("." + className + "-number").text("???????????????");
      $(
        "." +
          className +
          "-button > .product-button > .plus-sign, ." +
          className +
          "-button > .product-button > .minus-sign"
      ).css("display", "none");
      $("." + className + "-button > .product-button > .plus-sign").css(
        "border-right",
        "none"
      );
      $("." + className + "-button > .product-button > .minus-sign").css(
        "border-left",
        "none"
      );
      $("." + className + "-button > .product-button").css(
        "justify-content",
        "center"
      );
      $("." + className + "-button").addClass("link-hover");
    } else {
      return cart[product][1];
    }
  }

  // Adjusts num-in-cart position when reaching double digits
  function adjustPosition() {
    if (totalInCart > 9 && totalInCart <= 19) {
      $(".num-in-cart").css("left", "12px");
    } else if (totalInCart > 19) {
      $(".num-in-cart").css("left", "11px");
    } else if (totalInCart <= 9) {
      $(".num-in-cart").css("left", "15px");
    }
  }

  // To store array: arrayToLocalStorage(cart);
  // To retrieve array: JSONtoArray();

  function arrayToLocalStorage(array) {
    localStorage.setItem("cart", JSON.stringify(array));
  }

  function JSONtoArray() {
    var tempJSON = localStorage.getItem("cart");
    return JSON.parse(tempJSON);
  }

  function isThereLocalArray() {
    if (localStorage.getItem("cart") === null) {
      return false;
    } else {
      return true;
    }
  }

  function updatePage() {
    if (cart[0][1] > 0) {
      $(".banana-number").text(cart[0][1]);
      $(
        ".banana-button > .product-button > .plus-sign, .banana-button > .product-button > .minus-sign"
      ).css("display", "flex");
      $(".banana-button > .product-button > .plus-sign").css(
        "border-right",
        "solid 1px black"
      );
      $(".banana-button > .product-button > .minus-sign").css(
        "border-left",
        "solid 1px black"
      );
      $(".banana-button > .product-button").css(
        "justify-content",
        "space-between"
      );
      $(".banana-button").removeClass("link-hover");
      bExit = true;
    }

    if (cart[1][1] > 0) {
      $(".cauliflower-number").text(cart[1][1]);
      $(
        ".cauliflower-button > .product-button > .plus-sign, .cauliflower-button > .product-button > .minus-sign"
      ).css("display", "flex");
      $(".cauliflower-button > .product-button > .plus-sign").css(
        "border-right",
        "solid 1px black"
      );
      $(".cauliflower-button > .product-button > .minus-sign").css(
        "border-left",
        "solid 1px black"
      );
      $(".cauliflower-button > .product-button").css(
        "justify-content",
        "space-between"
      );
      $(".cauliflower-button").removeClass("link-hover");
      cExit = true;
    }

    if (cart[2][1] > 0) {
      $(".loquat-number").text(cart[2][1]);
      $(
        ".loquat-button > .product-button > .plus-sign, .loquat-button > .product-button > .minus-sign"
      ).css("display", "flex");
      $(".loquat-button > .product-button > .plus-sign").css(
        "border-right",
        "solid 1px black"
      );
      $(".loquat-button > .product-button > .minus-sign").css(
        "border-left",
        "solid 1px black"
      );
      $(".loquat-button > .product-button").css(
        "justify-content",
        "space-between"
      );
      $(".loquat-button").removeClass("link-hover");
      lExit = true;
    }

    numInCart();
    $(".num-in-cart").text(totalInCart);

    adjustPosition();
  }

  // PRODUCT PAGE

  $(".products-page-image").click(function () {
    var originalSource = $(".products-page-image.active").attr("src");
    var newSource = $(this).attr("src");
    $(".products-page-image.active").attr("src", newSource);
  });

  // Checkout Sidebar Close/Open

  $(".cart").click(function () {
    $(".checkout").css("display", "flex");
    $(".checkout").removeClass(
      "animate__animated animate__fadeOutRight animate__faster"
    );
    $(".checkout").addClass(
      "animate__animated animate__fadeInRight animate__faster"
    );
  });

  $(".checkout-close").click(function () {
    $(".checkout").removeClass(
      "animate__animated animate__fadeInRight animate__faster"
    );
    $(".checkout").addClass(
      "animate__animated animate__fadeOutRight animate__faster"
    );
  });

  // CHECKOUT PAGE

  // Updates information in checkout.html on load
  var totalCost; // Keeps track of sub total cost
  var grandTotal; // Keeps track of grand total (subtotal + shipping)
  fetchOrderNumber(); // Fetches order number
  fetchProductInfo(); // Product info pulled to DOM
  updateQuantityTotal();

  function fetchProductInfo() {
    firestore // Retrieves latest order number from Firestore
      .collection("products")
      .get()
      .then((querySnapshot) => {
        var tempArray = [];
        // Fetching each doc
        querySnapshot.forEach((doc) => {
          tempArray.push(doc.id, doc.data().price, doc.data().quantity);
        });
        for (let i = 0; i < tempArray.length; i += 3) {
          var product = tempArray[i];
          var price = tempArray[i + 1];
          var quantity = tempArray[i + 2];
          // Locates text area for item
          var itemPricePath =
            ".cpi-" +
            product +
            " > .checkout-item-info > .checkout-item-name > .item-price";
          var itemTotalNumberPath =
            ".cpi-" +
            product +
            " > .checkout-item-info > .checkout-item-total > .item-total-number";

          // FOR UPDATING PRICE AND QUANTITY ON INDEX AND PRODUCT PAGE
          var firebasePrice = "." + product + "-firebasePrice";
          var firebaseQuantity = "." + product + "-firebaseQuantity";

          // Will only write the price to the correct location
          $(itemPricePath).text(price);
          $(itemTotalNumberPath).text(price);
          $(firebasePrice).text(price);
          $(firebaseQuantity).text(quantity);
        }
        productPriceAssignVar(); // Pull DOM text to var
        updateQuantityTotal();
      })
      .catch(function (error) {
        console.log("Product info retrieval FAILED", error);
      });
  }

  // Assigns above fetched text to var
  var bananaPrice;
  var cauliflowerPrice;
  var loquatPrice;
  function productPriceAssignVar() {
    var product;
    for (let i = 0; i < cart.length; i++) {
      product = cart[i][0];
      console.log(product);
      var itemPricePath =
        ".cpi-" +
        product +
        " > .checkout-item-info > .checkout-item-name > .item-price";

      console.log(itemPricePath);
      if (i == 0) {
        bananaPrice = parseInt($(itemPricePath).text());
        console.log(bananaPrice);
      } else if (i == 1) {
        cauliflowerPrice = $(itemPricePath).text();
      } else if (i == 2) {
        loquatPrice = $(itemPricePath).text();
      }
    }
  }

  // Update Function
  function updateQuantityTotal() {
    var bananaCost = bananaPrice * cart[0][1];
    var cauliflowerCost = cauliflowerPrice * cart[1][1];
    var loquatCost = loquatPrice * cart[2][1];
    var shippingCost;
    var freeShippingLimit = 300;
    $(".checkout-quantity-banana").text(cart[0][1]);
    $(".checkout-quantity-cauliflower").text(cart[1][1]);
    $(".checkout-quantity-loquat").text(cart[2][1]);
    $(".checkout-total-calc-banana").text(bananaCost);
    $(".checkout-total-calc-cauliflower").text(cauliflowerCost);
    $(".checkout-total-calc-loquat").text(loquatCost);
    $(".banana-total").text(bananaCost);
    $(".cauliflower-total").text(cauliflowerCost);
    $(".loquat-total").text(loquatCost);
    totalCost = bananaCost + cauliflowerCost + loquatCost;
    if (totalCost >= freeShippingLimit) {
      shippingCost = 0;
    } else {
      shippingCost = 100;
    }
    $(".shipping-total").text(shippingCost);
    grandTotal = totalCost + shippingCost;
    $(".sum-total").text("$" + grandTotal);
  }

  // Updates on click
  $(".add-to-cart-link").click(function () {
    updateQuantityTotal();
  });
  $(".plus-sign").click(function () {
    updateQuantityTotal();
  });
  $(".minus-sign").click(function () {
    updateQuantityTotal();
  });

  // Confirm Popup at checkout

  // Few values to feed into templateParams for email
  $(".form-submit-button").click(function () {
    var emptyForm = false; // Default: Form is filled
    if (
      !$(".form-name > .form-input").val() ||
      !$(".form-email > .form-input").val() ||
      !$(".form-phone > .form-input").val() ||
      !$(".form-cellphone > .form-input").val() ||
      !$(".form-address > .form-input").val()
    ) {
      // If ANY PART OF (||) form IS NOT filled
      emptyForm = true; // emptyForm is true
    }

    if (totalInCart > 0 && !emptyForm && confirm("????????????????") && !submitted) {
      // If confirmed, and first submission, and form isn't empty...
      submitted = true; // Ensures form cannot be submitted again by accident
      var name = $(".form-name > .form-input").val();
      var email = $(".form-email > .form-input").val();
      var phone = $(".form-phone > .form-input").val();
      var cellphone = $(".form-cellphone > .form-input").val();
      var address = $(".form-address > .form-input").val();

      sendReceiptEmail(); // Sends a receipt based on inputs and cart information. [200 MONTHLY QUOTA - UNCOMMENT TO USE]
      submitCart(name, email, phone, cellphone, address); // Submits information to database
    } else if (submitted) {
      // Prevents double submittion
      alert(
        "You have already submitted. Thank you! You will be redirected soon."
      );
      window.location.href = "checkout-finish.html"; // Redirects user back to checkout-finish.html
    } else if (totalInCart <= 0) {
      alert("Your cart is empty! Please add some items then try again.");
    } else if (emptyForm) {
      // Alerts --> feedback on missing entry via red line
      alert("Please completely fill out the form!");
      if (!$(".form-name > .form-input").val()) {
        $(".form-name").css("border-bottom", "solid 1px red");
      }
      if (!$(".form-email > .form-input").val()) {
        $(".form-email").css("border-bottom", "solid 1px red");
      }
      if (!$(".form-phone > .form-input").val()) {
        $(".form-phone").css("border-bottom", "solid 1px red");
      }
      if (!$(".form-cellphone > .form-input").val()) {
        $(".form-cellphone").css("border-bottom", "solid 1px red");
      }
      if (!$(".form-address > .form-input").val()) {
        $(".form-address").css("border-bottom", "solid 1px red");
      }
    } else {
      return false;
    }
  });

  // Retrieves order number
  function fetchOrderNumber() {
    firestore // Retrieves latest order number from Firestore
      .collection("orders")
      .orderBy("orderNum", "desc")
      .limit(1)
      .get()
      .then((filteredCollection) => {
        filteredCollection.forEach((doc) => {
          var newOrderNumber = doc.data().orderNum + 1;
          console.log("The new order number is: " + newOrderNumber);
          $(".order-number").text(newOrderNumber); // Adding one to always have new order whenever anything submits
        });
      })
      .catch(function (error) {
        console.log("Got an error: ", error);
      });
  }

  // Submits the cart to backend database (Google API Firestore)
  function submitCart(
    nameInput,
    emailInput,
    phoneInput,
    cellphoneInput,
    addressInput
  ) {
    // Writes order number onto DOM
    orderNumber = $(".order-number").text();

    // For debugging purposes
    console.log(
      nameInput +
        " " +
        emailInput +
        " " +
        phoneInput +
        " " +
        cellphoneInput +
        " " +
        addressInput +
        " " +
        orderNumber
    );

    // Sends current prices to price array
    updatePriceArray();

    // Writes curent order to Firestore
    firestore
      .collection("orders")
      .doc(orderNumber)
      .set({
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        cellphone: cellphoneInput,
        address: addressInput,
        orderNum: parseInt(orderNumber),
        array: cartAdapter(),
        total: grandTotal,
        timestamp: firebase.firestore.Timestamp.now(),
        payment: false,
        status: "payment pending",
        notes: "",
      })
      .then(() => {
        console.log(
          "User: " + nameInput + " information and cart has been submitted!"
        );
      })
      .catch((error) => {
        console.error("Ahhhh shit, here we go again... FAILED!", error);
      });
  }

  // Edits cart array to be compatible with Firestore - Structure is [NAME, NUMBER, NAME, NUMBER...]
  function cartAdapter() {
    var newArray = [];
    for (let i = 0; i < cart.length; i++) {
      newArray.push(cart[i][0]);
      newArray.push(cart[i][1]);
    }
    return newArray;
  }

  // EMAIL JS SCRIPT
  // Init emailjs
  emailjs.init("user_cbbZSENkqDVuhdpUpxpHN"); // https://dashboard.emailjs.com/admin/integration
  // Emailjs script

  // Sends email based on parameters above
  function sendReceiptEmail() {
    emailjs
      .send("servce_alin5647", "receipt-form", {
        orderNumber: $(".order-number").text().toString(),
        bananaQt: $(".checkout-quantity-banana").text(),
        bananaUnitPrice: 30,
        bananaSum: $(".banana-total").text(),
        cauliflowerQt: $(".checkout-quantity-cauliflower").text(),
        cauliflowerUnitPrice: 30,
        cauliflowerSum: $(".cauliflower-total").text(),
        loquatQt: $(".checkout-quantity-loquat").text(),
        loquatUnitPrice: 50,
        loquatSum: $(".loquat-total").text(),
        subTotal: totalCost,
        shipping: $(".shipping-total").text(),
        finalSum: grandTotal,
        userMail: $(".form-email > .form-input").val().toString(),
        address: $(".form-address > .form-input").val().toString(),
        name: $(".form-name > .form-input").val().toString(),
      })
      .then(
        function () {
          console.log(
            "SUCCESS! Receipt has been sent to email address provided!"
          );
          window.location.href = "checkout-finish.html"; // Redirects user back to checkout-finish.html
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }

  // NON SCALING - Stores price array to JS!
  function updatePriceArray() {
    itemPrice[0][1] = $(".checkout-total-calc-banana").text();
    itemPrice[1][1] = $(".checkout-total-calc-cauliflower").text();
    itemPrice[2][1] = $(".checkout-total-calc-loquat").text();
    localStorage.setItem("itemPrice", JSON.stringify(itemPrice));
  }
});
