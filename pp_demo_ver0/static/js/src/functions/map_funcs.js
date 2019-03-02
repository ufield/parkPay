var mapInit = function(){
  var icons = new Array(100);
  var map = initMap('mapid');
  map.setZoom(16);
  map.panTo([ 35.943560,136.188917 ]); // 鯖江駅
  // map.addIcon(35.943560,136.188917, "さばええき")

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
            // TODO: parking-icon
            icons[i] = map.addIcon(lat, lng, name, "https://yumu19.github.io/egmapjs/icon-carparking.png", 64, 64)
        }
    });

}