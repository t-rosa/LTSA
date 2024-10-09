import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Map as OLMap, View as OLView } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';

@Component({
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export default class MapComponent implements OnInit, OnDestroy {
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

  handleOpacityChange(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    const layers = this.map().getAllLayers();
    if (layers.length) {
      const osm = layers[0];
      osm.setOpacity(Number.parseFloat(target.value));
    }
  }

  ngOnDestroy(): void {
    this.map().dispose();
  }
}
