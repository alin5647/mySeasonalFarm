// Keeps track of produce
var cart = [
  ["banana", 0],
  ["cauliflower", 0],
  ["loquat", 0],
];

var totalInCart = 0;

var orderNumber;

// True = Going TO zero. False = Going FROM zero
var bExit = false;
var cExit = false;
var lExit = false;

$(document).ready(function () {
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
      $("." + className + "-number").text("加入購物車");
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
      $("." + className + "-number").text("加入購物車");
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
    $(".checkout").removeClass("animate__animated animate__fadeOutRight");
    $(".checkout").addClass("animate__animated animate__fadeInRight");
  });

  $(".checkout-close").click(function () {
    $(".checkout").removeClass("animate__animated animate__fadeInRight");
    $(".checkout").addClass("animate__animated animate__fadeOutRight");
  });

  // CHECKOUT PAGE

  // Updates information in checkout.html on load
  var totalCost; // Keeps track of total cost
  updateQuantityTotal();
  fetchOrderNumber(); // Fetches order number

  // Update Function
  function updateQuantityTotal() {
    var bananaCost = 30 * cart[0][1];
    var cauliflowerCost = 30 * cart[1][1];
    var loquatCost = 50 * cart[2][1];
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
    $(".sum-total").text("$" + totalCost);
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
  var submitted = false; // Checks if form has been submitted or not
  $(".form-submit-button").click(function () {
    if (confirm("確定送出嗎?") && !submitted) {
      submitted = true; // Ensures form cannot be submitted again by accdient
      var firstName = $(".first-name > .form-input").val();
      var lastName = $(".last-name > .form-input").val();
      var email = $(".form-email > .form-input").val();
      var phone = $(".form-phone > .form-input").val();
      var address = $(".form-address > .form-input").val();
      submitCart(firstName, lastName, email, phone, address); // Submits information to database
      // window.location.href = "checkout-finish.html"; // Redirects user back to checkout-finish.html
    } else if (submitted) {
      alert(
        "You have already submitted. Thank you! You will be redirected soon."
      );
      // window.location.href = "checkout-finish.html"; // Redirects user back to checkout-finish.html
    } else {
      return false;
    }
  });

  // Clear cart on return-home-button press
  $(".return-home-button").click(function () {
    cart = [
      ["banana", 0],
      ["cauliflower", 0],
      ["loquat", 0],
    ];
    arrayToLocalStorage(cart);
    updatePage();
    submitted = false; // Resets the submit button
  });

  // Retrieves order number
  function fetchOrderNumber() {
    firestore // Retrieves latest order number from Firestore
      .collection("orders")
      .doc("tracker")
      .get()
      .then((doc) => {
        if (doc && doc.exists) {
          var newOrderNumber = parseInt(doc.data().number) + 1
          $(".order-number").text(newOrderNumber); // Adding one to always have new order whenever anything submits
        }
      })
      .catch(function (error) {
        console.log("Got an error: ", error);
      });
  }

  // Test store cart array (add listener to this function - need to edit html)
  function submitCart(
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneInput,
    addressInput
  ) {
    orderNumber = $(".order-number").text();
    console.log(
      firstNameInput +
        " " +
        lastNameInput +
        " " +
        emailInput +
        " " +
        phoneInput +
        " " +
        addressInput +
        " " +
        orderNumber
    );
    firestore // Writes curent order to Firestore
      .collection("test")
      .doc(orderNumber)
      .set({
        first: firstNameInput,
        last: lastNameInput,
        email: emailInput,
        phone: phoneInput,
        address: addressInput,
        orderNum: orderNumber,
        array: cartAdapter(),
      })
      .then(() => {
        console.log(
          "User: " +
            firstNameInput +
            " " +
            lastNameInput +
            " information and cart has been submitted!"
        );
      })
      .catch((error) => {
        console.error("Ahhhh shit, here we go again... FAILED!", error);
      });
    firestore // Writes curent order to Firestore
      .collection("orders")
      .doc("tracker")
      .set({
        number: orderNumber
      })
      .then(() => {
        console.log(
          "The order number has been updated to" + orderNumber
        );
      })
      .catch((error) => {
        console.error("Order number update... FAILED!", error);
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
});
