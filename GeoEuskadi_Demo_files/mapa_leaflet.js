var map = L.map('map').setView([4.801, -72.646], 11); 

L.control.scale().addTo(map);

var Layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
}).addTo(map);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

var baseLayers = {
    "OSM": Layer,
    "Black And White": OpenStreetMap_BlackAndWhite,
    "Topo": OpenTopoMap
};

function Stylevereda(feature) {
    return{
        fillColor: "red",
        color: "White",
        weight: 0.7,
        opacity: 0.6,
    }
};

function popupvereda(feature, layer) { 
if (feature.properties && feature.properties.VEREDA) 
{ 
layer.bindPopup("VEREDA " + feature.properties.VEREDA); 
} 
}

/* Obtiene el color segun el contenido del campo*/
function getColor(d) {
return d == 'Coberturas Naturales a Usos Productivos' ? 'orange' : 
d == 'Otros Usos a Usos Productivos' ? 'yellow' : 
d == 'SIN CAMBIOS' ? '#87EE0B' : 
d == 'Sin cambio' ? '#87EE0B' : 
d == 'Usos Productivos a Coberturas Naturales' ? '#196F3D' : 
d == 'Usos Productivos a Otros Usos' ? '#FEB24C' : 
'#FFEDA0'; 
}

function Stylecambios(feature) {
    return{
        fillColor: getColor(feature.properties.CAMBIO_GRU),
        color: "White",
        weight: 0.5,

    };
};
function popupcambios(feature, layer) { 
if (feature.properties && feature.properties.CAMBIO_GRU) 
{ 
layer.bindPopup(feature.properties.CAMBIO_GRU); 
} 
}

/* Cambia el icono de los puntos*/
function popuphumfob(feature, layer) { 
if (feature.properties && feature.properties.Predio) 
{ 
layer.bindPopup("Ubicado en el predio " + feature.properties.Predio); 
} 
}


var Veredas = L.geoJson(veredas, {style: Stylevereda, onEachFeature: popupvereda}).addTo(map);
var Cambios = L.geoJson(cambioshum, {style:Stylecambios, onEachFeature: popupcambios});
var Humedales = L.geoJson(humedales, {onEachFeature:popuphumfob});
var areasinclusion = L.geoJson(areasinclusion);
var buenaspracticas = L.geoJson(buenaspracticas);
var cobertura25k = L.geoJson(cobertura25k);
var confliusosuelo = L.geoJson(confliusosuelo);
var invhumiavh = L.geoJson(invhumiavh);
var microcuencas = L.geoJson(microcuencas);
var pozos = L.geoJson(pozos);
var runap = L.geoJson(runap);
var sueprotec = L.geoJson(sueprotec);
var zonprio = L.geoJson(zonprio);
var zonrecu = L.geoJson(zonrecu);

var overlays = {
    "Vereda": Veredas,
    "Inventario humedales FOB": Humedales,
    "Cambios coberturas 2007 - 2016": Cambios,
    "Area de inclusión": areasinclusion,
    "Buenas practicas": buenaspracticas,
    "Cobertura 1:25.000": cobertura25k,
    "Conflicto de uso de suelo": confliusosuelo,
    "Inventario de humedales IAvH": invhumiavh,
    "Microcuencas": microcuencas,
    "Pozos": pozos,
    "RUNAP": runap,
    "Suelo de protección": sueprotec,
    "Zonas prioritarias": zonprio,
    "Zonas de recuperación": zonrecu
};

var c = L.control.layers(baseLayers, overlays, {collapsed: false}).addTo(map);

$('#capasDiv').append(c.onAdd(map));
$('.leaflet-top.leaflet-right').hide() = true;

/*var legend = L.control({position: 'bottomright'});
**legend.onAdd = map => {
    const title = '<h3>LEGEND:</h3>';
    const div = L.DomUtil.create('div', 'info legend')
    div.innerHTML = title + [
    ['Veredas','Veredas'],
    ['areasinclusion', 'areasinclusion'],
    ['Cambios','Cambios']
    ].map(a => `<span id="${a[0]}"><i></i> ${a[1]}</span>`).join('')
    return div;
};

legend.addTo(map);

map.on('overlayadd', e => $(`.legend > span:contains(${e.name})`).toggle() );

map.on('overlayremove', e => $(`.legend > span:contains(${e.name})`).toggle() );*/
 














//var map_layers = []; //Array con las capas que se han añadido al mapa. Para poder encontrarlas.

//var loc_marker = null; //Pin con la localización del usuario. Si esta cambiara se eliminará y se añadirá uno nuevo


//-------------------

//Opciones del mapa
//var mapOptions = {
//    center: [5.00, -72.75],
//    zoom: 12
//};


//*******************************
// LOAD MAP AND CONTROLS
//*******************************

//El DOM (controles) esta ya cargado. --> Inicializamos controles.
//$(document).ready(function () {
    //Ocultamos el panel de detalles
//    $("#itemDetails").hide();
    //Cargamos las capas en el listado
//    var capasDropDown = $("#capasDropDown");
//    $.each(_configuracion.Capas, function () {
//        capasDropDown.append($("<option />").val(JSON.stringify(this)).text(this.Titulo));
//    });
    //Inicializamos el mapa
//   loadMap();
//});


//Inicializamos el mapa
//function loadMap() {
//map = L.map('map', mapOptions);
///-----------------

   
//var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
//var osm = new L.TileLayer(osmUrl, { minZoom: 1, maxZoom: 18, attribution: osmAttrib });

//var bawUrl = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
//var bawAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
//var baw = new L.TileLayer(bawUrl, {minZoom: 1, maxZoom: 18, attribution:bawAttrib});

//var OpenTopoUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
//var OpenTopoAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
//var OpenTopoMap = new L.tileLayer(OpenTopoUrl, {minZoom: 1, maxZoom: 18, attribution:OpenTopoAttrib});
    
//map.addLayer(osm);
//map.addLayer(baw);
//map.addLayer(OpenTopoMap);
    
    
//var capasBase = {
    //"OpenStreetMap": osm,
    //"balckandWhite": baw,
    //"OpenTopo": OpenTopoMap,
//};

//var selectorCapas = new L.control.layers(capasBase)
//selectorCapas.addTo(map)
//}
 
 

//*******************************
// GEOLOCATION
//*******************************

//Cuando se pulsa el botón de "Mi Ubicación"
//function geolocate() {
    //var gpsoptions = {
        //maximumAge: 10000,
        //enableHighAccuracy: true,
        //timeout: 600000
    //};
    //if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(addPosition, GeolocationError, gpsoptions);
    //} if (window.navigator.geolocation) {
        //window.navigator.geolocation.getCurrentPosition(addPosition, GeolocationError, gpsoptions);
    //} else {
        //error("Geolocation is not supported by this browser.");
    //}
//}

//Mostramos la unicación del usuario e incremetamos el zoom a su posición
//function addPosition(position) {
    //if (position.coords != null) {
        //map.setView([position.coords.latitude, position.coords.longitude], 18);

        //if (loc_marker != null) {
            //map.removeLayer(loc_marker);
        //}
        //var myIcon = L.icon({
            //iconUrl: './GeoEuskadi_Demo_files/geolocation_marker.png',
            //iconSize: [22, 22]
        //});

        //loc_marker = L.marker([position.coords.latitude, position.coords.longitude], { icon: myIcon });

        //loc_marker.addTo(map);
    //}
//}

//Si se ha producido un error al obtener la ubicación del usuario
//function GeolocationError(err) {
    //alert("ERROR: " + JSON.stringify(err));
//}

//*******************************
// LAYERS MANAGEMENT
//*******************************
//Cuando se pulsa el botón de añadir capa
