import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Club {
  nombre: string;
  fechaFundacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private apiUrl = 'http://localhost:8080/clubes/nombres-fechas'; // Asegúrate de que esta ruta coincida con la del backend

  constructor(private http: HttpClient) { }

      // Obtener el token de autorización almacenado
      private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token'); // O donde tengas almacenado el token JWT
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`, // Agregar el token JWT
        });
      }
      

  listarNombresYFechas(): Observable<Club[]> {
    return this.http.get<Club[]>(`this.apiUrl`, { headers: this.getAuthHeaders() });
  }
}

