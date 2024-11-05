import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../model/encuestas/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private apiUrl = 'http://localhost:8080/api/respuestas';

  constructor(private http: HttpClient) {}

  enviarRespuestas(respuestas: any[]): Observable<void> {
    return this.http.post<void>(this.apiUrl, respuestas);
  }

    // Obtener respuestas agrupadas por ID de grupo
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');  // O donde tengas almacenado el token JWT
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`  // Agregar el token JWT a las cabeceras
      });
    }
  
    // Cargar respuestas agrupadas con autenticación
    getRespuestasAgrupadas(): Observable<number[]> {
      return this.http.get<number[]>(`${this.apiUrl}/grupos`, { headers: this.getAuthHeaders() });  // Cambia a 'grupos'
    }
    
  
    // Obtener respuestas por grupo
    getRespuestasPorGrupo(idRespuestaGrupo: number): Observable<Respuesta[]> {
      return this.http.get<Respuesta[]>(`${this.apiUrl}/grupo/${idRespuestaGrupo}`, { headers: this.getAuthHeaders() });
    }

    getEstadisticas(idEncuesta: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/estadisticas/${idEncuesta}`, { headers: this.getAuthHeaders() });
    }    

    getRespuestasPorIds(ids: number[]): Observable<Respuesta[]> {
      return this.http.post<Respuesta[]>(`${this.apiUrl}/obtenerRespuestasPorIds`, ids, { headers: this.getAuthHeaders() });
    }
    
}
