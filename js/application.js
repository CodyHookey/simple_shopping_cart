var updateItems = function () {
    var items = 0;

    $('tbody tr').each(function () {
        items ++;
    });

    $('#itemCount').html(items);
}

var updateCost = function (element) {
    var price = parseFloat($(element).find('.price').text());
    var quantity = parseFloat($(element).find('.quantity input').val());

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

    $('#totalValue').html(subtotal.toFixed(2));
}

var finalBreakdown = function () {
    var subtotal = parseFloat($('#totalValue').text());
    var shipping = parseFloat($('#shipping').text());
    
    var vat = (subtotal + shipping) * 0.2;
    $('#vat').html(vat.toFixed(2));

    var cartTotal = subtotal + shipping + vat;
    $('#cartTotal').html(cartTotal.toFixed(2))
}

$(document).ready(function () {
    updateSubtotal();
    finalBreakdown();
    updateItems();

    $('tbody').on('input', 'tr input', function () {
        var row = $(this).closest('tr');
        updateCost(row);
        updateSubtotal();
        finalBreakdown();
    });

    $(document).on("click", ".btn-remove", function (event) {
        $(this).closest("tr").remove();
        updateSubtotal();
        finalBreakdown();
        updateItems();
    });

    $('#addProduct').on('submit', function (event) {
        event.preventDefault();
        
        var name = $(this).find('[name=name]').val();
        var price = parseFloat($(this).find('[name=price]').val());

        // Validate inputs
        if (!name || price <= 0) {
            alert('Please enter a valid product name and price!');
            return;
        }

        $('tbody').append('<tr>' + '<td class="item">' + name + '</td>' 
            + '<td class="text-center">£<span class="price">' + price + '</span></td>' + 
            '<td class="quantity text-center">' + '<input type="number" value="1">' + '</td>' + 
            '<td class="cost text-center"></td>' + '<td class="text-center">' + '<button class="btn btn-xs btn-remove">Remove</button>' + '</td>' + 
            '</tr>'
        );

        $(this).find('[name=name]').val('');
        $(this).find('[name=price]').val('');

        updateSubtotal();
        finalBreakdown();
        updateItems();
    });
});