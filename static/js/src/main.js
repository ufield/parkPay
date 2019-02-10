var enter_time;
var exit_time;
var price;
var rate = 10; // 1秒に10円課金

// 入場ボタン押したとき
$(document).on('click', '#enter', function () {
    enter_time = Math.round((new Date()).getTime() / 1000);

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

});


// 退場ボタン押したとき
$(document).on('click', '#exit', function () {
    exit_time = Math.round((new Date()).getTime() / 1000);
    var parking_time;
    if(enter_time && exit_time > enter_time){
        parking_time = exit_time - enter_time;
    } else{
        parking_time = 1;
    }

    price = rate * parking_time;

    $.ajax({
        'type': 'GET',
        'url': 'exit',
        'dataType': 'text',
        'data': {'id':'1', 'price': price},
    })
    .done(function(res){
        console.log(res);
       // TODO: ここに退場→支払い完了後の処理を記述
    })
    .fail(function(err){
        console.log(err);
    })

});