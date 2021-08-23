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
        $(".page-container").css("width", "96vw")
        $(".top-icon-open").show();
        $(".top-icon-close").hide();
        sideBarOpen = false;
    }
    else {
        $(".expand-sidebar").show();
        $(".page-container").css("width", "83vw")
        $(".top-icon-open").hide();
        $(".top-icon-close").show();
        sideBarOpen = true;
    }
  });
});
