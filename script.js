// Keeps track of produce
var cart = [
  ["banana", 0],
  ["cauliflower", 0],
  ["loquat", 0],
];

var totalInCart = 0;

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

  // City Filter Function
  function cityFilter() {
    $(".dropdown").classList.toggle("city-list-show");
  }

  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = $(".form-city-input");
    filter = input.value.toUpperCase();
    div = $(".form-city-list");
    a = $(".form-city-list > a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
});
