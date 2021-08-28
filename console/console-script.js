$(document).ready(function () {
  // Hover acts on both icon and name
  $(".slim > * > .sidebar-item, .expand > * > .sidebar-item").hover(
    function () {
      var elementClassName = "." + $(this).attr("class").split(" ")[1]; // Gets the second class name of the element
      $(elementClassName).css("background-color", "rgba(0, 0, 0, 0.7)");

      console.log(elementClassName + " has been hovered");
    },
    function () {
      var elementClassName = "." + $(this).attr("class").split(" ")[1]; // Gets the second class name of the element
      $(elementClassName).css("background-color", "rgba(0, 0, 0, 0)");
      console.log(elementClassName + " has been UNhovered");
    }
  );

  // Closes expandable portion of the sidebar
  var sideBarOpen = true;
  $(".top-icon").click(function () {
    // If sidebar is open
    if (sideBarOpen) {
      $(".expand-sidebar").hide();
      $(".page-container").css("width", "96vw");
      $(".top-icon-open").show();
      $(".top-icon-close").hide();
      sideBarOpen = false;
    } else {
      $(".expand-sidebar").show();
      $(".page-container").css("width", "83vw");
      $(".top-icon-open").hide();
      $(".top-icon-close").show();
      sideBarOpen = true;
    }
  });

  // Functions to run on page load
  fetchProductInfo();

  // Pulls quantity and price of each product into array
  function fetchProductInfo() {
    firestore // Retrieves latest order number from Firestore
      .collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(
            doc.id +
              " has " +
              doc.data().quantity +
              " left, and costs $" +
              doc.data().price
          );
          $("." + doc.id + " > .product-manage > .current-quantity > .firestore-quantity").text(doc.data().quantity);
          $("." + doc.id + " > .product-manage > .current-price > .firestore-price").text(doc.data().price);
        });
      })
      .catch(function (error) {
        console.log("Product info retrieval FAILED", error);
      });
  }

  // Updates price or quantity of any product
  function updateProduct(productName, quantityChange, priceChange) {
    if (quantityChange != null && priceChange == null) {
      firestore // Write PRICE into chosen product
        .collection("products")
        .doc(productName)
        .set({
          quantity: quantityChange,
        })
        .then(() => {
          console.log(
            "The QUANTITY of product, " +
              productName +
              ", is updated to: " +
              quantityChange
          );
          $(".status").css({ display: "flex", color: "rgb(0, 255, 0)" });
          $(".status-icon").show();
          $(".status-message").text("Your changes have been saved!");
          fetchProductInfo();
          setTimeout(function () {
            $(".status").css("display", "none");
          }, 5000);
        })
        .catch((error) => {
          console.error(
            "updateProduct() - quantity failed. Price not updated.",
            error
          );
          $(".status").css({ display: "flex", color: "red" });
          $(".status-icon").hide();
          $(".status-message").text("Error! Changes not saved...");
          setTimeout(function () {
            $(".status").css("display", "none");
          }, 5000);
        });
    } else if (quantityChange == null && priceChange != null) {
      firestore // Write QUANTITY into chosen product
        .collection("products")
        .doc(productName)
        .set({
          price: priceChange,
        })
        .then(() => {
          console.log(
            "The PRICE of product, " +
              productName +
              ", is updated to: " +
              priceChange
          );
          $(".status").css({ display: "flex", color: "rgb(0, 255, 0)" });
          $(".status-icon").show();
          $(".status-message").text("Your changes have been saved!");
          fetchProductInfo();
          setTimeout(function () {
            $(".status").css("display", "none");
          }, 5000);
        })
        .catch((error) => {
          console.error(
            "updateProduct() - price failed. Price not updated.",
            error
          );
          $(".status").css({ display: "flex", color: "red" });
          $(".status-icon").hide();
          $(".status-message").text("Error! Changes not saved...");
          setTimeout(function () {
            $(".status").css("display", "none");
          }, 5000);
        });
    } else if (quantityChange != null && priceChange != null) {
      firestore // Write QUANTITY AND PRICE into chosen product
        .collection("products")
        .doc(productName)
        .set({
          price: priceChange,
          quantity: quantityChange,
        })
        .then(() => {
          console.log(
            "The PRICE of product, " +
              productName +
              ", is updated to: " +
              priceChange +
              " and the QUANTITY is updated to: " +
              quantityChange
          );
          $(".status").css({ display: "flex", color: "rgb(0, 255, 0)" });
          $(".status-icon").show();
          $(".status-message").text("Your changes have been saved!");
          fetchProductInfo();
          setTimeout(function () {
            $(".status").css("display", "none");
          }, 5000);
        })
        .catch((error) => {
          console.error(
            "updateProduct() - quantity+price failed. Price not updated.",
            error
          );
          $(".status").css({ color: "red", display: "flex" });
          $(".status-icon").hide();
          $(".status-message").text("Error! Changes not saved...");
          setTimeout(function () {
            $(".status").css("display", "none");
          }, 5000);
        });
    }
  }

  // Quantity change function on submit button click
  $(".submit-button").click(async function () {
    // Determines which product to be edited
    var selectedProduct = $(this)
      .parents(".product")
      .attr("class")
      .split(" ")[1];

    console.log("Class name found... " + selectedProduct);

    var selectedProductJQuery = "." + selectedProduct;

    console.log("JQuery selector... " + selectedProductJQuery);
    // Pulls current quantity from DOM (pulled from firestore on load)
    var newQuantity;
    var currentQuantity = $(
      selectedProductJQuery +
        " > .product-manage > .current-quantity > .firestore-quantity"
    ).text();

    console.log("Current Quantity: " + currentQuantity);
    var quantityChangeType = $(
      selectedProductJQuery +
        " > .product-manage > .change-quantity > .quantity-change-type"
    ).val();

    console.log("Change type : " + quantityChangeType);
    var quantityInput = $(
      selectedProductJQuery +
        " > .product-manage > .change-quantity > .quantity"
    ).val();

    console.log("Quantity Input: " + quantityInput);

    if (quantityInput != null) {
      // Calculated new quantity based on selection
      if (quantityChangeType == "add") {
        newQuantity = parseInt(currentQuantity) + parseInt(quantityInput);
      } else if (quantityChangeType == "subtract") {
        newQuantity = parseInt(currentQuantity) - parseInt(quantityInput);
      } else if (quantityChangeType == "update") {
        newQuantity = quantityInput;
      }
    } else {
      newQuantity = null;
    }

    console.log("New quantity: " + newQuantity);

    // Pulls current quantity from DOM (pulled from firestore on load)
    var newPrice;
    var priceInput = $(
      selectedProductJQuery > ".product-manage" > ".change-price" > ".price"
    ).val();

    var currentPrice = $(
      selectedProductJQuery +
        " > .product-manage > .current-price > .firestore-price"
    ).text();

    console.log("Current price: " + currentPrice);
    var priceChangeType = $(
      selectedProductJQuery +
        " > .product-manage > .change-price > .price-change-type"
    ).val();

    console.log("Change type : " + priceChangeType);
    var priceInput = $(
      selectedProductJQuery + " > .product-manage > .change-price > .price"
    ).val();

    if (priceInput != null) {
      // Calculated new price based on selection
      if (priceChangeType == "add") {
        newPrice = parseInt(currentPrice) + parseInt(priceInput);
      } else if (priceChangeType == "subtract") {
        newPrice = parseInt(currentPrice) - parseInt(priceInput);
      } else if (priceChangeType == "update") {
        newPrice = priceInput;
      }
    } else {
      newPrice = null;
    }

    console.log("New price: " + newPrice);

    // Checks to see if any change is inputted
    if (priceInput == null && quantityInput == null) {
      alert("Please select change type and provide a value to change!");
    } else {
      updateProduct(selectedProduct, newQuantity, newPrice);
    }
  });
});
