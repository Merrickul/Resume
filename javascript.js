require([
"esri/config",
"esri/Map",
"esri/views/MapView",
"esri/layers/FeatureLayer",
"esri/widgets/Legend",
"esri/layers/VectorTileLayer",
"esri/Basemap",
"esri/widgets/Editor",
"esri/widgets/FeatureTable",
"esri/layers/GeoJSONLayer",

], function(esriConfig,Map,MapView,FeatureLayer,Legend,VectorTileLayer,Basemap,Editor,FeatureTable,GeoJSONLayer) {

esriConfig.apiKey = "AAPKbe972146ddb049fa9116c2e4e7174d4fxmrofXW27EhV77tc4HPWYt26W-oQNXaT4ORDlK6ZMni2fuFbHlsbYG2qKvKKW2f9";


//Hobbies (points)
const HobbiesLayer = new FeatureLayer({
url: "https://services.arcgis.com/w9dBo4CVIrugrGos/arcgis/rest/services/01_hobbies/FeatureServer/0"
});

const BaseMapLayer = new VectorTileLayer({
portalItem: {
  id: "f288fd4aafa14e9da382b13774360c0f"
}
}
);

const basemap = new Basemap({
baseLayers:[
  BaseMapLayer
]
})

const map = new Map({
basemap: basemap,
layers: [HobbiesLayer]
//https://developers.arcgis.com/javascript/3/jsapi/esri.basemaps-amd.html
//ESRI Basemaps
});

const view = new MapView({
container: "viewDiv",
map: map,
//center: [-79.78218118406,43.715355993267536],
zoom: 13
});

const trailheadsRenderer = {
"type": "simple",
"symbol": {
"type": "picture-marker",
"url": "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
"width": "25px",
"height": "25px"
}
}

// Editor widget
const editor = new Editor({
  view: view
});
// Add widget to the view
view.ui.add(editor, "top-right");

map.add(HobbiesLayer);


const legend = new Legend({
view: view,
layerInfos:
[
  {
    layer: HobbiesLayer,
    title: "Mountain Biking Locations",
  }
]
});

legend.style = {
  type: "card",
  layout: "auto"
};

view.ui.add(legend, "bottom-right");

//Return the Extent of the points
HobbiesLayer.when(() => {
  return HobbiesLayer.queryExtent();
})
.then((response) => {
  view.goTo(response.extent);
});

const table = new FeatureTable({
  layer: HobbiesLayer,
  visibleElements: {selectionColumn: false}, // hide the selection column since we are not working with a corresponding map
  // autocastable to FieldColumnConfig
  // The fieldColumnConfigs are used to determine which attributes are shown in the table
  // If the fieldColumnConfigs are not set, all attributes will be shown
  fieldConfigs: [
    {
      name: "Name",
      label: "Name"
    },
    {
      name: "Info",
      label: "Information"
    }],
  container: document.getElementById("tableDiv")
});

});
