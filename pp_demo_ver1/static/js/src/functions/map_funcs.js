var map = {};

map._GMAP_;

map.parkingMarkers = [];
map.infoWindows = [];
map.meter2latdeg = 0.000008983148616; // 日本における1mを緯度経度換算(およその値)
map.meter2lngdeg = 0.000010966382364; // 日本における1mを緯度経度換算(およその値)


map.init = function(){
    map._GMAP_ = new google.maps.Map(document.getElementById('map'), {
        center: { // 地図の中心を指定
            lat: 35.943560, // 緯度
            lng: 136.186917 // 経度
        },
        fullscreenControl: false,
        mapTypeControl: false,
        zoom: 16 // 地図のズームを指定
    });

  // SPARQLクエリー
  var query = `
        prefix ic: <http://imi.go.jp/ns/core/rdf#>
        prefix xsd: <http://www.w3.org/2001/XMLSchema#>
        select ?uri ?name ?lat ?lng {
            ?uri ic:名称 [ ic:表記 ?name ].
            ?uri ic:地理座標 [ ic:緯度 ?lat; ic:経度 ?lng; ].
            filter(contains(str(?name),'駐車場'))
        } limit 100
  `

  querySPARQL(query, function(data) {
    var items = data.results.bindings;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var lat = item.lat.value;
      var lng = item.lng.value;
      var name = item.name.value;


      var latLng  = new google.maps.LatLng(lat, lng);
      var iconUrl = "/static/img/icons8-parking-80.png";  // TODO: parking-icon
      var parkingMarker = new google.maps.Marker(
        {
          map: map._GMAP_,
          position: latLng,
          icon: {
            url: iconUrl,
            scaledSize : new google.maps.Size(45, 45)
          },
          name: name,
        }
      );


      google.maps.event.addListener(parkingMarker, 'click', function(){
        var lat  = this.position.lat();
        var lng  = this.position.lng();
        var name = this.name;

        var content = name + "<br>" + "lat: " + lat + "   lng: " + lng;

        var infoWindow = new google.maps.InfoWindow({
          content: content
        })

        infoWindow.open(map._GMAP_, this);
      })

      // parkingMarker.addListener('click', function(){
      //   map.infoWindows[i].open(map._GMAP_, this);
      // })

      map.parkingMarkers[i] = parkingMarker;
      // map.infoWindows.push(infoWindow);
    }
  });


  // 車アイコンを置く
  car.setMap(pos.carInitial);


  // TODO: 店アイコン & 人アイコン


};

/*
  from: {lat: lat, lng: lng}
  to:   {lat: lat, lng: lng}
 */
map.createRoute = function(from, to, steps){
  route = []; // {lat: lat, lng: lng} の配列
  var latLeap = (to.lat - from.lat) / steps;
  var lngLeap = (to.lng - from.lng) / steps;

  for(var i = 0; i < steps + 1; i++){
    var pos = {lat: from.lat + latLeap * i, lng: from.lng + lngLeap * i}
    route.push(pos);
  }

  return route;
}



// var mapInit = function(){
//   var icons = new Array(100);
//
//
//
//   var map = initMap('mapid');
//   map.setZoom(16);
//   map.panTo([ 35.943560,136.188917 ]); // 鯖江駅
//   // map.addIcon(35.943560,136.188917, "さばええき")
//
//   // SPARQLクエリー
//   var query = `
//         prefix ic: <http://imi.go.jp/ns/core/rdf#>
//         prefix xsd: <http://www.w3.org/2001/XMLSchema#>
//         select ?uri ?name ?lat ?lng {
//             ?uri ic:名称 [ ic:表記 ?name ].
//             ?uri ic:地理座標 [ ic:緯度 ?lat; ic:経度 ?lng; ].
//             filter(contains(str(?name),'駐車場'))
//         } limit 100
//   `
//   querySPARQL(query, function(data) {
//         var items = data.results.bindings;
//         for (var i = 0; i < items.length; i++) {
//             var item = items[i];
//             var lat = item.lat.value;
//             var lng = item.lng.value;
//             var name = item.name.value;
//             // TODO: parking-icon
//             icons[i] = map.addIcon(lat, lng, name, "https://yumu19.github.io/egmapjs/icon-carparking.png", 64, 64)
//         }
//     });
//
// }