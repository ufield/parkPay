var car = {};
car.inPark = false; // false -> 駐車場外, true -> 駐車場内

// var enter_time;
// var exit_time;

car.onEnter = function(){

  $('#status').text("入庫中");
  $('#status').css('background-color', '#BCEBFF');

  id = setInterval("priceup()",2000);
  setEnterInfo();
}

car.onExit = function(){
  if(!car.inPark) return false; //　出庫しているなら何もしない

  $('#status').text("出庫");
  $('#status').css('background-color', '#CEFFBC');
  clearInterval(id);
  // doPayment(); //本来ならこの場所が正しいが、デモ用にcar.moveのdeferredに場所をずらす
}



car.setMap = function(position){
  var latLng = new google.maps.LatLng(position.lat, position.lng);
  var iconUrl = "/static/img/icons8-suv-96.png";

  map.carMarker = new google.maps.Marker(
    {
      map: map._GMAP_,
      position: latLng,
      icon: {
        url: iconUrl,
        scaledSize : new google.maps.Size(45, 45)
      },
      zIndex: 1000000,
    }
  );

};


car.move = function(from, to, steps){
  if(!steps) steps = 200;
  // 1. 車を動かす経路を定義
  var route = map.createRoute(from, to, steps);

  var defer = $.Deferred();

  var iRoute = 0;
  var timer_id = setInterval(function(){
    let lat = route[iRoute].lat;
    let lng = route[iRoute].lng;

    console.log(lat, lng);

    map.carMarker.setPosition(new google.maps.LatLng(lat, lng));

    if(iRoute === route.length - 1){
      defer.resolve();
      clearInterval(timer_id);
    }

    iRoute++;

  }, 10);

  return defer.promise();
};


car.isInPark = function(){
  // ちゃんとイベントを定義
  var carLat = map.carMarker.position.lat();
  var carLng = map.carMarker.position.lng();

  var minParkLat = pos.parkGoal.lat - map.meter2latdeg;
  var maxParkLat = pos.parkGoal.lat + map.meter2latdeg;
  var minParkLng = pos.parkGoal.lng - map.meter2lngdeg;
  var maxParkLng = pos.parkGoal.lng + map.meter2lngdeg;

  this.inPark = carLat > minParkLat && carLat < maxParkLat && carLng > minParkLng && carLng < maxParkLng;

  return this.inPark;
};