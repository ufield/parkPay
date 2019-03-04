var person = {};

person.goDepartmentStore = function(){
  // 車がパーキングにいることが前提
  if(!car.inPark) return;
  var promise = person.moveFromCar(pos.departmentStore, 100);

  promise.then(function(){
    buy1();
    return person.moveToCar(pos.departmentStore, 100);
  }).done(function(){
    map.personMarker.setMap(null);
    map.personMarker = null;
  });

};


person.goRestaurant = function(){
  // 車がパーキングにいることが前提
  if(!car.inPark) return;
  var promise = person.moveFromCar(pos.restaurant, 100);

  promise.then(function(){
    buy2();
    return person.moveToCar(pos.restaurant, 100);
  }).done(function(){
    map.personMarker.setMap(null);
    map.personMarker = null;
  });

}


person.moveFromCar = function(to, steps){
  var carPos = {lat: map.carMarker.position.lat(), lng: map.carMarker.position.lng()}
  if(map.personMarker){
    map.personMarker.setPosition(new google.maps.LatLng(carPos.lat, carPos.lng));
  } else{
    map.createPersonMarker(carPos);
  }

  var route = map.createRoute(carPos, to, steps);

  return map.moveMarker(map.personMarker, route);
}

person.moveToCar = function(from, steps){
  var carPos = {lat: map.carMarker.position.lat(), lng: map.carMarker.position.lng()}
  if(map.personMarker){
    map.personMarker.setPosition(new google.maps.LatLng(from.lat, from.lng));
  } else{
    map.createPersonMarker(from);
  }

  var route = map.createRoute(from, carPos, steps);

  return map.moveMarker(map.personMarker, route);

}
