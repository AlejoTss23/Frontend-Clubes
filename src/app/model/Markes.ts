export interface Marker {
  id: number | null;
    nombre: string;
    direccion: string;
    latitud: string;
    longitud: string;
    info: string;
    markerInstance?: L.Marker;
  }
  