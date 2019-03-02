var inPark = false; // false -> 駐車場外, true -> 駐車場内

function enter(){
  if(inPark) return false; // すでに入庫中なら何もしない
  inPark = true;

  $('#status').text("入庫中");
  $('#status').css('background-color', '#BCEBFF');

  // for (var i = 0; i < icons.length; i++) {
  //   icons[i] = null
  // }

  id = setInterval("priceup()",2000);
  setEnterInfo();
}

function exit(){
  if(!inPark) return false; //　出庫しているなら何もしない

  $('#status').text("出庫");
  $('#status').css('background-color', '#CEFFBC');
  clearInterval(id);
  doPayment();
}
