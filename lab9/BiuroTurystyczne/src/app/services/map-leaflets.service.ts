import { Injectable } from '@angular/core';
import * as Leaflet from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class MapLeafletsService {
  getLayers(): Leaflet.Layer[] {
    return [
      new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      } as Leaflet.TileLayerOptions),
    ] as Leaflet.Layer[];
  };

  getMapOptions(zoom: number, center: Leaflet.LatLng): Leaflet.MapOptions {
    return {
      zoom: zoom,
      center: center,
      layers: this.getLayers()
    } as Leaflet.MapOptions;
  }
}
