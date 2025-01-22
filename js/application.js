$(document).ready(function () {
    $("tbody tr").each(function (index, element) {
        var price = parseFloat($(element).children('.price').text());
        var quantity = parseFloat($(element).children('.Quantity input').val());
    
        var cost = price * quantity
        $(element).children('.cost').html(cost);

        return cost;
    });
});

