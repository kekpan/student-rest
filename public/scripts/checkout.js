Stripe.setPublishableKey('pk_test_51Gt7l9L0WBGdFziUurwhTbVFPkvDLUjD0Ax7l6ctsUjEoULErGIkfmfYeLkp7suKqOYkUvSTkXBDNOprVeqT8cLt00q2YiyseD');

const $form = $('#payment-form');

$(document).ready( _ => {
    $form.submit((e) => {
        $("#alert").hide();
        $form.find('button').prop('disabled', true);
        Stripe.card.createToken({
            number: $('#card-number').val(),
            cvc: $('#card-cvc').val(),
            exp_month: $('#card-expiry-month').val(),
            exp_year: $('#card-expiry-year').val(),
            name: $('#card-name').val()
        }, stripeResponseHandler);
        return false;
    });
});

stripeResponseHandler = (status, response) => {
    if (response.error) {
        $("#alert").show();
        $('#alert').text(response.error.message);
        $form.find('button').prop('disabled', false); // Re-enable submission
    } else {
        // Get the token ID:
        const token = response.id;
        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // Submit the form:
        $form.get(0).submit();  
    }
}
