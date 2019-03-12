var disableButtons = function(){
    $('#enter').prop('disabled', true);
    $('#exit').prop('disabled', true);
    $('#buy1').prop('disabled', true);
    $('#buy2').prop('disabled', true);
};

var enableButtons = function(){
    $('#enter').prop('disabled', false);
    $('#exit').prop('disabled', false);
    $('#buy1').prop('disabled', false);
    $('#buy2').prop('disabled', false);
}


$(document).ready(function() {
    // mapInit();
    map.init();
    person.init();
    paymentInit();
});

