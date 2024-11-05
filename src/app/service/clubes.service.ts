import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Clubes } from '../model/clubes';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClubesService {

  clubesActualizar = new Subject<Clubes[]>();
  private url: string = 'http://localhost:8080/clubes';

  constructor(private http: HttpClient) {}

  // Método para obtener las cabeceras de autenticación con el token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Verifica que el token esté almacenado en localStorage
    if (!token) {
      console.error('Token no encontrado en localStorage');
      return new HttpHeaders();  // Devolver cabeceras vacías si no hay token
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Agregar el token JWT a las cabeceras
    });
  }

  // Listar clubes con token en las cabeceras
  listar() {
    const headers = this.getAuthHeaders();
    return this.http.get<Clubes[]>(this.url, { headers });
  }

  // Eliminar club con token en las cabeceras
  eliminar(id: number) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.url}/${id}`, { headers });
  }

  // Editar club con token en las cabeceras
  editar(clubes: Clubes) {
    const headers = this.getAuthHeaders();
    return this.http.put(this.url, clubes, { headers });
  }

  // Registrar club con token en las cabeceras
  registrar(clubes: Clubes) {
    const headers = this.getAuthHeaders();
    return this.http.post(this.url, clubes, { headers });
  }

  // Obtener clubes paginados con token en las cabeceras
  listPageable(pag: number, tam: number) {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.url}/pageable?page=${pag}&size=${tam}`, { headers });
  }

  // Asociar respuesta a club con token en las cabeceras
  asociarRespuestaAClub(clubConRespuestaGrupo: { idClubes: number, idRespuestaGrupo: number }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.url}/asociar-respuesta`, clubConRespuestaGrupo, { headers, responseType: 'text' });
  }

  // Obtener respuestas asociadas a un club con token en las cabeceras
  obtenerRespuestasPorClub(idClubes: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.url}/clubes/${idClubes}/respuestas`, { headers });
  }
}
