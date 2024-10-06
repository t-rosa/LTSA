import 'ol/ol.css';
import { Component, OnInit, signal } from '@angular/core';
import { Map as OLMap, View as OLView } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';

@Component({
  standalone: true,
  template: '<div id="map">',
  styles: `#map {
    height: 100dvh;
  }`,
})
export default class MapComponent implements OnInit {
  map = signal(new OLMap());

  ngOnInit(): void {
    const source = new OSM();

    const layer = new TileLayer({
      source,
    });

    const view = new OLView({
      zoom: 5,
      center: [0, 0],
    });

    this.map.set(
      new OLMap({
        view,
        layers: [layer],
        target: 'map',
      })
    );
  }

  handleClick() {
    console.log(this.map().getAllLayers());
  }
}
