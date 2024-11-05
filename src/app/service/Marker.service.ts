import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marker } from '../model/Markes';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private baseUrl = 'http://localhost:8080/api/markers'; // URL base de tu API

  constructor(private http: HttpClient) { }

  getAllMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(this.baseUrl);
  }

  getMarkerById(id: number): Observable<Marker> {
    return this.http.get<Marker>(`${this.baseUrl}/${id}`);
  }

  createMarker(marker: Marker): Observable<Marker> {
    return this.http.post<Marker>(this.baseUrl, marker);
  }

  updateMarker(id: number, marker: Marker): Observable<Marker> {
    const markerToSend = { ...marker };
    delete markerToSend.markerInstance; // Eliminar la instancia de marcador antes de enviar
    return this.http.put<Marker>(`${this.baseUrl}/${id}`, markerToSend);
  }

  deleteMarker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
