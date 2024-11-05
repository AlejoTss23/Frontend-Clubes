import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from '../model/Markes';
import { MarkerService } from '../service/Marker.service';


// Establecer el ícono predeterminado
const defaultIcon = L.icon({
  iconUrl: 'assets/marker-icon.png', // Actualiza la ruta del ícono
  shadowUrl: 'assets/marker-shadow.png', // Actualiza la ruta de la sombra
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto donde se ancla el ícono
  popupAnchor: [1, -34], // Punto donde se abre el popup
  shadowSize: [41, 41] // Tamaño de la sombra
});

@Component({
  selector: 'app-mapa-ubicacion',
  templateUrl: './mapa-ubicacion.component.html',
  styleUrls: ['./mapa-ubicacion.component.css']
})
export class MapaUbicacionComponent implements OnInit {
  map!: L.Map; 
  markers: Marker[] = [];
  markerActual: Marker = { id: null, nombre: '', direccion: '', latitud: '', longitud: '', info: '' };
  searchText: string = '';
  selectedMarker: any = null;



  constructor(private markerService: MarkerService) {}



  ngOnInit(): void {
    this.initMap();
    this.loadMarkers();
    
  }

  private initMap(): void {
    this.map = L.map('map').setView([-31.4167, -60.6833], 8); // Coordenadas de Santa Fe

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Evento de clic en el mapa para obtener coordenadas
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.markerActual.latitud = e.latlng.lat.toString();
      this.markerActual.longitud = e.latlng.lng.toString();
    });
  }

  private loadMarkers(): void {
    this.markerService.getAllMarkers().subscribe(markers => {
      this.markers = markers;
      this.markers.forEach(marker => {
        const mapMarker = L.marker([+marker.latitud, +marker.longitud], { icon: defaultIcon, draggable: true }).addTo(this.map);
        mapMarker.bindPopup(`<b>${marker.nombre}</b><br>${marker.info}`).openPopup();

        // Actualizar las coordenadas cuando se arrastra el marcador
        mapMarker.on('dragend', () => {
          const position = mapMarker.getLatLng();
          marker.latitud = position.lat.toString();
          marker.longitud = position.lng.toString();
          this.updateMarker(marker); // Actualiza el marcador en la base de datos
        });

        marker.markerInstance = mapMarker; // Almacenar la referencia en el modelo
      });
    });
  }

  onSubmit(): void {
    if (this.markerActual.id === null) {
      // Crear un nuevo marcador
      this.markerService.createMarker(this.markerActual).subscribe(newMarker => {
        const mapMarker = L.marker([+newMarker.latitud, +newMarker.longitud], { icon: defaultIcon, draggable: true }).addTo(this.map);
        mapMarker.bindPopup(`<b>${newMarker.nombre}</b><br>${newMarker.info}`).openPopup();

        // Actualizar las coordenadas cuando se arrastra el marcador
        mapMarker.on('dragend', () => {
          const position = mapMarker.getLatLng();
          newMarker.latitud = position.lat.toString();
          newMarker.longitud = position.lng.toString();
          this.updateMarker(newMarker); // Actualiza el marcador en la base de datos
        });

        this.markers.push({
          ...newMarker,
          markerInstance: mapMarker
        });
      });
    } else {
      // Editar un marcador existente
      this.markerService.updateMarker(this.markerActual.id!, this.markerActual).subscribe(updatedMarker => {
        const existingMarker = this.markers.find(m => m.id === updatedMarker.id);
        if (existingMarker) {
          existingMarker.markerInstance!.setLatLng([+updatedMarker.latitud, +updatedMarker.longitud]);
          existingMarker.markerInstance!.setPopupContent(`<b>${updatedMarker.nombre}</b><br>${updatedMarker.info}`);
        }
      });
    }

    // Limpiar el formulario
    this.markerActual = { id: null, nombre: '', direccion: '', latitud: '', longitud: '', info: '' };
  }

  onEdit(marker: Marker): void {
    this.markerActual = { ...marker };
  }

  onDelete(id: any): void {
    this.markerService.deleteMarker(id).subscribe(() => {
      const markerIndex = this.markers.findIndex(m => m.id === id);
      if (markerIndex !== -1) {
        this.map.removeLayer(this.markers[markerIndex].markerInstance!);
        this.markers.splice(markerIndex, 1);
      }
    });
  }

  private updateMarker(marker: Marker): void {
    this.markerService.updateMarker(marker.id!, marker).subscribe(() => {
      console.log('Marcador actualizado');
    });
  }

  onViewDetails(marker: any): void {
    this.selectedMarker = marker;
  }

  closeDetails(): void {
    this.selectedMarker = null;
  }
}

