$(document).on('click', '#exit', function(){
    car.onExit();
    var promise = car.move(pos.parkGoal, pos.carFinal, 200);
    promise.done(function(){
        // exit();
        doPayment();
    });
});

$(document).on('click', '#enter', function(){
  var promise = car.move(pos.carInitial, pos.parkGoal);

  promise.done(function(){
    // 車がpark内にいることを確認、enterイベント実行
    if(car.isInPark()){
        console.log("入庫完了");
        car.onEnter();
    }
  });

});



$(document).on('click', '#buy1', function(){
    buy1();
});

$(document).on('click', '#buy2', function(){
    buy2();
});

$(document).on('click', '#init', function(){
    map.init();
    paymentInit();
});