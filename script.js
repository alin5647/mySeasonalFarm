$(document).ready(function() {
    var cart = [['Banana', 0],['Cauliflower', 0],['Loquat', 0]];
    $(".banana-button").click(function() {
        cart[0][1] = 1;
        $(".banana-number").text(cart[0][1]);
        $(".banana-button > .product-button > .plus-sign, .banana-button > .product-button > .minus-sign").attr("style", "display: flex");
        $(".banana-button > .product-button").attr("style", "justify-content: space-between");
    })
    $(".cauliflower-button").click(function() {
        cart[1][1] = 1;
        $(".cauliflower-number").text(cart[1][1]);
    })
    $(".loquat-button").click(function() {
        cart[2][1] = 1;
        $(".loquat-number").text(cart[2][1]);
    })
})
