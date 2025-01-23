var updateCost = function (element) {
    var price = parseFloat($(element).find('.price').text());
    var quantity = parseFloat($(element).find('.Quantity input').val());

    var cost = price * quantity
    $(element).find('.cost').html("£" + cost.toFixed(2));

    return cost;
};

var updateSubtotal = function () {
    var subtotal = 0;

    $('tbody tr').each(function () {
        var cost = updateCost(this);
        subtotal += cost;
    });

    $('div h3 #totalValue').html(subtotal.toFixed(2));
}

$(document).ready(function () {
    updateSubtotal();

    $('tbody').on('input', 'tr input', function () {
        var row = $(this).closest('tr');
        updateCost(row);
        updateSubtotal();
    });

    $(document).on("click", ".btn-remove", function (event) {
        $(this).closest("tr").remove();
        updateSubtotal();
    });
});