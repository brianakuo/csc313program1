
import {Feature, Map, Overlay, View} from 'ol/index.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {useGeographic} from 'ol/proj.js';

useGeographic();

const place = [-121, 36];
const slo3 = [-120.7, 35.28];
const bay2 = [-122, 38];
const la1 = [-119, 34.2];

const point = new Point(place);
const slopt = new Point(slo3);
const baypt = new Point(bay2);
const lapt = new Point(la1);

const map = new Map({
  target: 'map',
  view: new View({
    center: place,
    zoom: 7,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [new Feature(slopt)],
      }),
      style: {
        'circle-radius': 12,
        'circle-fill-color': 'purple',
      },
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [new Feature(baypt)],
      }),
      style: {
        'circle-radius': 8,
        'circle-fill-color': 'orange',
      },
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [new Feature(lapt)],
      }),
      style: {
        'circle-radius': 4,
        'circle-fill-color': 'yellow',
      },
   }),
  ],
});
/*
const element = document.getElementById('popup');

const popup = new Overlay({
  element: element,
  stopEvent: false,
});
map.addOverlay(popup);

function formatCoordinate(coordinate) {
  return `
    <table>
      <tbody>
        <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
        <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
      </tbody>
    </table>`;
}

const info = document.getElementById('info');
map.on('moveend', function () {
  const view = map.getView();
  const center = view.getCenter();
  info.innerHTML = formatCoordinate(center);
});
*/
/*
let popover;
map.on('click', function (event) {
  if (popover) {
    popover.dispose();
    popover = undefined;
  }
  const feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (!feature) {
    return;
  }
  const coordinate = feature.getGeometry().getCoordinates();
  popup.setPosition([
    coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
    coordinate[1],
  ]);

  popover = new bootstrap.Popover(element, {
    container: element.parentElement,
    content: formatCoordinate(coordinate),
    html: true,
    offset: [0, 20],
    placement: 'top',
    sanitize: false,
  });
  popover.show();
});
*/
map.on('pointermove', function (event) {
  const type = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
  map.getViewport().style.cursor = type;
});
