var person = {};

person.doneStore = false;
person.doneRestaurant = false;

person.init = function () {
  person.doneStore = false;
  person.doneRestaurant = false;
  if(map.personMarker) map.personMarker.setMap(null);
  map.personMarker = null;
}


person.goDepartmentStore = function(){
  // 車がパーキングにいることが前提
  if(!car.inPark) return;

  if(!map.personMarker){
    var carPos = {lat: map.carMarker.position.lat(), lng: map.carMarker.position.lng()}
    map.createPersonMarker(carPos);
    var promise = person.move(carPos, pos.departmentStore, 100);
  } else{
    // 人間が食堂にいる
    var promise = person.move(pos.restaurant, pos.departmentStore, 100)
  }

  promise.then(function() {

    setTimeout("buy1()", 1000);
    person.doneStore = true;

    var d = new $.Deferred();
    setTimeout(function () {
      // 指定時間経過後にresolveしてdeferredを解決する
      d.resolve();
    }, 2000);

    return d.promise();
    // if(person.doneStore && person.doneRestaurant){
    //
    //   return person.moveToCar(pos.departmentStore, 100);
//    }
  }).then(function(){
    if(person.doneStore && person.doneRestaurant){
      return person.moveToCar(pos.departmentStore, 100);
    }
  }).done(function(){
    if(person.doneStore && person.doneRestaurant){
      person.init();
    }
  });

};


person.goRestaurant = function(){
  // 車がパーキングにいることが前提
  if(!car.inPark) return;
  if(!map.personMarker){
    var carPos = {lat: map.carMarker.position.lat(), lng: map.carMarker.position.lng()}
    map.createPersonMarker(carPos);
    var promise = person.move(carPos, pos.restaurant, 100);
  } else{
    // 人間がデパートにいる
    var promise = person.move(pos.departmentStore, pos.restaurant, 100)
  }

  promise.then(function(){
    setTimeout("buy2()", 1000);
    person.doneRestaurant = true;

    var d = new $.Deferred();
    setTimeout(function(){
        // 指定時間経過後にresolveしてdeferredを解決する
        d.resolve();
    }, 2000);

    return d.promise();
    // if(person.doneStore && person.doneRestaurant){
    //   return person.moveToCar(pos.restaurant, 100);
    // }
  }).then(function(){
    if(person.doneStore && person.doneRestaurant){
      return person.moveToCar(pos.restaurant, 100);
    }
  }).done(function(){
    if(person.doneStore && person.doneRestaurant){
      person.init();
    }
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


person.move = function(from, to, steps){
  var route = map.createRoute(from, to, steps);
  if(map.personMarker){
    map.personMarker.setPosition(new google.maps.LatLng(from.lat, from.lng));
  } else{
    map.createPersonMarker(from);
  }
  return map.moveMarker(map.personMarker, route);

}