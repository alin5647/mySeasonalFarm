$(document).ready(function () {
  function JSONtoArray() {
    var tempJSON = localStorage.getItem("itemPrice");
    return JSON.parse(tempJSON);
  }

  function isThereLocalArray() {
    if (localStorage.getItem("itemPrice") === null) {
      return false;
    } else {
      return true;
    }
  }

  if (isThereLocalArray()) {
    var itemArray = JSONtoArray();
    $(".banana-total").text(itemArray[0][1]);
    $(".cauliflower-total").text(itemArray[1][1]);
    $(".loquat-total").text(itemArray[2][1]);
    var sumTotal = parseInt(itemArray[0][1]) + parseInt(itemArray[1][1]) + parseInt(itemArray[2][1]);
    $(".sum-total").text("$" + sumTotal);
  }
  else {
      console.log("itemArray doesnt exist in local storage!");
  }
});
