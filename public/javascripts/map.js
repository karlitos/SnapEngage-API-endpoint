var initialZoomLevel = 12;
var initialLatlng = L.latLng(52.507629, 13.404954);
var layerUrl = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

var map = new L.map('map').setView([0, 0], initialZoomLevel);
L.tileLayer(layerUrl, {
  attribution: attribution,
  maxZoom: 18,
}).addTo(map);

/* Initialize the SVG layer */
map._initPathRoot()
// after the 0.7 version following initialization should be used instead
//L.svg().addTo(map);

/* We simply pick up the SVG from the map object */
var svg = d3.select('#map').select('svg');

/* Grouping of all the SVG Elements representing the connections*/
var g = svg.append('g');

/* Update the map view to be centered to the middle of all searches*/
map.setView(initialLatlng, initialZoomLevel)

function placePointer(lat, lng){
  // set map view to current location
  map.setView([lat, lng], initialZoomLevel)

  /* Function clearing all searches visualization elements*/
  g.selectAll('*').remove();

  // convert the parameters to Leaflet coordinates
  var coordinates = new L.LatLng(lat, lng);

  /* The graphical elements visualizing the origins */
  var location = g.append('circle')
    .style('stroke', d3.rgb(38, 38, 38))
    .style('opacity', .8)
    .style('fill', d3.rgb(255, 145, 0))
    .attr('id', 'chatLocation');


  // update the map view
  map.on('viewreset', update);
  update();

  /* The update function taking care of placing and resizing of the overlayed elements*/
  function update() {
    location.attr('cx',function(d) { return map.latLngToLayerPoint(coordinates).x; });
    location.attr('cy',function(d) { return map.latLngToLayerPoint(coordinates).y; });
    location.attr('r',function(d) {
      return map.getZoom() < 13 ? 0.002*Math.pow(2,map.getZoom()) : 0.0007*Math.pow(2,map.getZoom());
    });
  }
}