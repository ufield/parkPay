var amount         = 0;
var parkFee        = 0;
var parkFeeRate    = 100;
var discount01     = 0;
var discountRate01 = -100;
var discount02     = 0;
var discountRate02 = -100;
var id;

function paymentInit(){
  car.inPark = false;
  $('#status').text("入庫前");
  $('#status').css('background-color', '#FFD8BC');
  clearInterval(id);
  parkFee = 0;
  amount = 0;
  discount01 = 0;
  discount02 = 0;
  $('#park-fee').text(parkFee.toString());
  $('#amount').text(amount.toString());
  $('#discount1').text(discount01.toString());
  $('#discount2').text(discount02.toString());
}

function updatePriceView(){
  $('#park-fee').text(parkFee.toString());
  $('#amount').text(amount.toString());
  $('#price_2_hidden').val(amount.toString());
}


function priceup(){
  parkFee += parkFeeRate;
  amount  += parkFeeRate;
  if(amount < 0) amount = 0;
  updatePriceView();
}

function buy1(){
  discount01 = discountRate01;
  amount    += discountRate01;
  $('#discount1').text("(Bデパートご利用)"+discount01.toString());
  updatePriceView();
}

function buy2(){
  discount02 = discountRate02;
  amount    += discountRate02;
  $('#discount2').text("(C食堂ご利用)"+discount02.toString());
  updatePriceView();
}



// 入場時情報をサーバーへ渡す
function setEnterInfo () {
    // enter_time = Math.round((new Date()).getTime() / 1000);

    $.ajax({
        'type': 'GET',
        'url': 'enter',
        'dataType': 'text',
        'data': {'id':'1'},
    })
    .done(function(res){
        console.log(res);
       // TODO: ここに入場後の処理を記述
    })
    .fail(function(err){
        console.log(err);
    })
};


// 支払い実行
function doPayment() {
    // exit_time = Math.round((new Date()).getTime() / 1000);
    $('#form1').attr('action', 'exit');
    $('#form1').submit();

   return true;

};