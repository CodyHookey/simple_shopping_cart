var updateCost = function (element) {
    var price = parseFloat($(element).children('.price').text());
    var quantity = parseFloat($(element).find('.Quantity input').val());

    var cost = price * quantity
    $(element).find('.cost').html(cost.toFixed(2));

    return cost;
};

$(document).ready(function () {
    $('tbody tr').each(function (i, element) {
        var cost = updateCost(element);
    });

    $('tbody').on('input', 'tr input', function () {
        var row = $(this).closest('tr');
        updateCost(row);
    });
});