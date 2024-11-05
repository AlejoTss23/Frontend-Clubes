import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encuesta } from '../model/encuestas/Encuesta';
import { Respuesta } from '../model/encuestas/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

    private apiUrl = 'http://localhost:8080/api'; // Cambia la URL según tu backend
  
    constructor(private http: HttpClient) {}
  
    // Obtener el token de autorización almacenado
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token'); // O donde tengas almacenado el token JWT
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Agregar el token JWT
      });
    }
    
// Obtener una encuesta por su ID (para la parte pública)
getEncuestaPublicaById(id: number): Observable<Encuesta> {
  return this.http.get<Encuesta>(`${this.apiUrl}/encuestas/${id}`);
}

    
  obtenerTodasLasEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(`${this.apiUrl}/encuestas`);
  }
  
    // Obtener todas las encuestas
    getEncuestas(): Observable<Encuesta[]> {
      return this.http.get<Encuesta[]>(`${this.apiUrl}/encuestas`);
    }
  
    // Obtener una encuesta por su ID
    getEncuestaById(id: number): Observable<Encuesta> {
      return this.http.get<Encuesta>(`${this.apiUrl}/encuestas/${id}`, { headers: this.getAuthHeaders() });
    }
  
    // Crear una nueva encuesta
    createEncuesta(encuesta: Encuesta): Observable<Encuesta> {
      return this.http.post<Encuesta>(`${this.apiUrl}/encuestas`, encuesta, { headers: this.getAuthHeaders() });
    }
  
    // Actualizar una encuesta existente
    updateEncuesta(id: number, encuesta: Encuesta): Observable<Encuesta> {
      return this.http.put<Encuesta>(`${this.apiUrl}/encuestas/${id}`, encuesta, { headers: this.getAuthHeaders() });
    }
  
    // Eliminar una encuesta por su ID
    deleteEncuesta(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/encuestas/${id}`, { headers: this.getAuthHeaders() });
    }
  }
  