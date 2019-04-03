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

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var baseLayers = {
    "OSM": Layer,
    "Black And White": OpenStreetMap_BlackAndWhite,
    "Topo": OpenTopoMap,
    "Imagery": Esri_WorldImagery
};

function Stylevereda(feature) {
    return{
        fillColor: "#01DF3A",
        color: "black",
        weight: 0.9,
        fillOpacity: 0.0,
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
        weight: 0.0,
        fillOpacity: 1,
    };
};
function popupcambios(feature, layer) { 
if (feature.properties && feature.properties.CAMBIO_GRU) 
{ 
layer.bindPopup(feature.properties.CAMBIO_GRU); 
} 
}

/* Cambia el icono de los puntos*/
function Stylecambioshum(feature) {
    return{
        fillColor: "green",
        color: "White",
        weight: 0.0,
        opacity: 0.1,
        fillOpacity: 1,

    };
};

/* Cambia el estilo y popup de las áreas de inclusión*/
function Styleareinc(feature) {
    return{
        fillColor: "#01DF3A",
        color: "black",
        weight: 0.3,
        fillOpacity: 1,

    };
};

/* estilo de la capa buenas practicas*/

function getColorbp(d) {
return d == 'Aguas continentales' ? '#005CE6' : 
d == 'Bosques' ? '#38A800' : 
d == 'Cultivos permanentes' ? '#FFFF73' : 
d == 'Cultivos transitorios' ? '#FFD37F' : 
d == 'Pastos' ? '#55FF00' : 
d == 'Zonas de extracción mineras y escombreras' ? '#CCCCCC' : 
d == 'Zonas industriales o comerciales y redes de comunicación' ? '#E64C00' : 
d == 'Zonas urbanizadas' ? '#4E4E4E' : 
d == 'Áreas abiertas, sin o con poca vegetación' ? '#E6E600' : 
d == 'Áreas agrícolas heterogéneas' ? '#73FFDF' : 
d == 'Áreas con vegetación herbácea y/o arbustiva' ? '#00734C' : 
d == 'Áreas húmedas continentales' ? '#73B2FF' : 
'#FFEDA0'; 
}

function Stylecambiosbp(feature) {
    return{
        fillColor: getColorbp(feature.properties.Nivel_2_Na),
        color: "black",
        weight: 0.0,
        fillOpacity: 1,
    };
};

/* Estilo de la capa de coberturas 25k*/

function getColor25k(d) {
return d == '1.2.2. Red vial, ferroviaria y terrenos asociados' ? '#CCCCCC' : 
d == '1.3.1. Zonas de extraccion minera' ? '#9C9C9C' : 
d == '2.3.1. Pastos limpios' ? '#FFFF00' : 
d == '2.3.2. Pastos arbolados' ? '#FFD37F' : 
d == '2.3.3. Pastos enmalezados' ? '#FFEBAF' : 
d == '2.4.2. Mosaico de pastos y cultivos' ? '#E9FFBE' : 
d == '3.1.1.1.1. Bosque denso alto de tierra firme' ? '#70A800' : 
d == '3.1.1.1.2. Bosque denso alto inundable' ? '#4CE600' : 
d == '3.1.1.2.1. Bosque denso bajo de tierra firme' ? '#00734C' : 
d == '3.1.2.2.1. Bosque abierto bajo de tierra firme' ? '#5C8944' : 
d == '3.1.2.2.2. Bosque abierto bajo inundable' ? '#00734C' : 
d == '3.1.4. Bosque de galeria y ripario' ? '#38A800' : 
d == '3.2.1.1.1.1. Herbazal denso de tierra firme no arbolado' ? '#A87000' : 
d == '3.2.1.1.2.1. Herbazal denso inundable no arbolado' ? '#70A800' : 
d == '3.2.1.1.2.2. Herbazal denso inundable arbolado' ? '#737300' : 
d == '3.2.2.1. Arbustal denso' ? '#D7C29E' : 
d == '3.2.2.2. Arbustal abierto' ? '#CDF57A' : 
d == '3.2.3. Vegetacion secundaria o en transicion' ? '#D1FF73' : 
d == '3.3.1. Zonas arenosas naturales' ? '#FFFF70' : 
d == '3.3.3. Tierras desnudas y degradadas' ? '#E6E600' : 
d == '3.3.4. Zonas quemadas' ? '#734C00' : 
d == '4.1.1. Zonas Pantanosas' ? '#00734C' : 
d == '4.1.3. Vegetacion acuatica sobre cuerpos de agua' ? '#BEE8FF' : 
d == '5.1.1. Rios (50 m)' ? '#00C5FF' : 
d == '5.1.2. Lagunas, lagos y cienagas naturales' ? '#005CE6' : 
'#FFEDA0'; 
}

function Stylecambios25k(feature) {
    return{
        fillColor: getColor25k(feature.properties.NIVEL4),
        color: "black",
        weight: 0.0,
        fillOpacity: 1,
    };
};

function popupcambios25k(feature, layer) { 
if (feature.properties && feature.properties.NIVEL4) 
{ 
layer.bindPopup(feature.properties.NIVEL4); 
} 
}

/*estilo de la capa conflictos de uso de suelo*/
function getColorconuso(d) {
return d == 'ADECUADO' ? '#55FF00' : 
d == 'INADECUADO' ? '#FFAA00' : 
d == 'MUY INADECUADO' ? '#FF0000' : 
d == 'SUBUTILIZADO' ? '#FFFFBE' : 
'#FFEDA0'; 
}

function Stylecambiosconuso(feature) {
    return{
        fillColor: getColorconuso(feature.properties.CONFLICT_2),
        color: "black",
        weight: 0.0,
        fillOpacity: 1,
    };
};

function popupcambiosconuso(feature, layer) { 
if (feature.properties && feature.properties.CONFLICT_2) 
{ 
layer.bindPopup(feature.properties.CONFLICT_2); 
} 
}


/* variables inlcuidas en el mapa - capas*/

var Veredas = L.geoJson(veredas, {style: Stylevereda, onEachFeature: popupvereda}).addTo(map);
var Cambios = L.geoJson(cambioshum, {style:Stylecambios, onEachFeature: popupcambios});

var geojsonMarkerOptions = {
            radius: 5,
            fillColor: "rgb(255,0,0)",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 1   
        };

var Humedales = L.geoJson(humedales, {
    pointToLayer: function (feature, latlng) {
        var popupOptions = {maxWidth: 200};
        var popupContent = "This is some content";
        return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup("HUMEDAL " + feature.properties.Predio); 
    }
});

var areasinclusion = L.geoJson(areasinclusion, {style: Styleareinc}).bindPopup("<h2>Área de inclusión.</h2>");
var buenaspracticas = L.geoJson(buenaspracticas, {style: Stylecambiosbp});
var cobertura25k = L.geoJson(cobertura25k, {style: Stylecambios25k, onEachFeature: popupcambios25k});
var confliusosuelo = L.geoJson(confliusosuelo, {style: Stylecambiosconuso, onEachFeature: popupcambiosconuso});

var geojsonMarkerOptionsiavh = {
            radius: 5,
            fillColor: "rgb(255,170,0)",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 1   
        };

var invhumiavh = L.geoJson(invhumiavh,{
    pointToLayer: function(feature, latlng){
        var popupOptions = {maxWidth: 200};
        var popupContent = "This is some content";
        return L.circleMarker(latlng, geojsonMarkerOptionsiavh).bindPopup("Humedal " + feature.properties.NOMBRE_GEO);
    }
});


/*--------------propiedades de la capa de microcuencas-----------------*/

function popupmicrocuencas(feature, layer) { 
if (feature.properties && feature.properties.MICRO_ZONA) 
{ 
layer.bindPopup("MICROCUENCA " + feature.properties.MICRO_ZONA); 
} 
}

function Stylermicrocuencas(feature) {
    return{
        fillColor: '#97DBF2',
        color: "#4065EB",
        weight: 0.8,
        fillOpacity: 0.5,
    };
};

var microcuencas = L.geoJson(microcuencas, {style: Stylermicrocuencas, onEachFeature: popupmicrocuencas});



/*--------propiedades de la capa de pozos*/



var geojsonMarkerOptionspozos = {
            radius: 5,
            fillColor: "rgb(0,255,0)",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 1   
        };

var pozos = L.geoJson(pozos, {
    pointToLayer: function(feature, latlng){
        var popupOptions = {maxWidth: 200};
        var popupContent = "This is some content";
        return L.circleMarker(latlng, geojsonMarkerOptionspozos).bindPopup("POZO " + feature.properties.WELL_NAME); 
    }
});


/*-----------propiedades de la cpa runap---------------------*/
function Stylerunap(feature) {
    return{
        fillColor: '#70A800',
        color: "black",
        weight: 0.0,
        fillOpacity: 1,
    };
};

function popuprunap(feature, layer) { 
if (feature.properties && feature.properties.categoria && feature.properties.nombre) 
{ 
layer.bindPopup(feature.properties.categoria + ": " + feature.properties.nombre); 
} 
}

var runap = L.geoJson(runap, {style: Stylerunap, onEachFeature: popuprunap});



/*-------------- propiedades de la capa suelos de protección---------------------*/

function getColorsueprotec(d) {
return d == 'Agricola' ? '#D1FF73' : 
d == 'Agropecuario' ? '#FFE1BE' : 
d == 'Area Urbana' ? '#686868' : 
d == 'Areas Susceptibles por Inundaciones' ? '#73B2FF' : 
d == 'Areas Susceptibles por Remoción Alta' ? '#734C00' : 
d == 'Areas de Producción Petrolera' ? '#FFAA00' : 
d == 'Areas de Recarga de Acuiferos' ? '#004DA8' : 
d == 'Bosques Galería y Matas del Monte' ? '#00C5FF' : 
d == 'Corredor Suburbano' ? '#F5F57A' : 
d == 'DMI Mata La Urama' ? '#A3FF73' : 
d == 'Microcuencas abastecedoras de Acueductos' ? '#00FFC5' : 
d == 'Reserva Forestal Protectora - Bosque Natural' ? '#267300' : 
d == 'Rondas de Nacimientos y Quebradas' ? '#00A9E6' : 
d == 'Sistemas Agroforestales' ? '#E6E600' : 
d == 'Suelos Frágiles' ? '#FFFFBE' : 
d == 'Zona Industrial' ? '#343434' : 
d == 'Zona de Expansión Urbana' ? '#D7C29E' : 
'#FFEDA0'; 
}

function Stylesueprotec(feature) {
    return{
        fillColor: getColorsueprotec(feature.properties.POTENCIAL),
        color: "black",
        weight: 0.0,
        fillOpacity: 1,
    };
};

function popupsueprotec(feature, layer) { 
if (feature.properties && feature.properties.POTENCIAL) 
{ 
layer.bindPopup(feature.properties.POTENCIAL); 
} 
}
var sueprotec = L.geoJson(sueprotec, {style: Stylesueprotec, onEachFeature:popupsueprotec});

/*----------propiedades de la capa zonas de prioridad------------------------*/

function getColorzonprio(d) {
return d == 'Erosión Ligera' ? '#FFFF73' : 
d == 'Erosión Moderada' ? '#FFAA00' : 
d == 'Erosión Severa' ? '#FF0000' : 
d == 'Sin Evidencia de Erosión' ? '#98E600' : 
d == 'Sin Suelo con Afloramiento Rocoso' ? '#9C9C9C' : 
d == 'Sin Suelo con Cuerpos de Agua' ? '#005CE6' : 
'#FFEDA0'; 
}

function Stylezonprio(feature) {
    return{
        fillColor: getColorzonprio(feature.properties.ZONIFICACI),
        color: "black",
        weight: 0.0,
        fillOpacity: 1,
    };
};

function popupzonprio(feature, layer) { 
if (feature.properties && feature.properties.ZONIFICACI) 
{ 
layer.bindPopup(feature.properties.ZONIFICACI); 
} 
}

var zonprio = L.geoJson(zonprio, {style: Stylezonprio, onEachFeature: popupzonprio});



/*----------propiedades de la capa zonas de recuperación-------------*/

var zonrecu = L.geoJson(zonrecu);


/*------------ agregando las capas al control de capas---------------*/


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
