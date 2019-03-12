$(document).on('click', '#exit', function(){
    car.onExit();
    disableButtons();
    var promise = car.move(pos.parkGoal, pos.carFinal, 200);
    promise.done(function(){
        // exit();
        doPayment();
        enableButtons();
    });
});

$(document).on('click', '#enter', function(){
  var promise = car.move(pos.carInitial, pos.parkGoal);

  disableButtons();
  promise.done(function(){
    // 車がpark内にいることを確認、enterイベント実行
    if(car.isInPark()){
        console.log("入庫完了");
        car.onEnter();
    }
    enableButtons();
  });

});



$(document).on('click', '#buy1', function(){
    person.goDepartmentStore();
    // buy1();
});

$(document).on('click', '#buy2', function(){
    person.goRestaurant();
    // buy2();
});

$(document).on('click', '#init', function(){
    map.init();
    paymentInit();
});