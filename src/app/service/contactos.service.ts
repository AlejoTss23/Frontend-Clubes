// src/app/services/contacto.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { contactos } from '../model/contactos';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private baseUrl = 'http://localhost:8080/contactos';

  constructor(private http: HttpClient) { }

  obtenerContactos(): Observable<contactos[]> {
    return this.http.get<contactos[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  obtenerContactoPorId(id: number): Observable<contactos> {
    return this.http.get<contactos>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  crearContacto(contacto: contactos): Observable<contactos> {
    return this.http.post<contactos>(this.baseUrl, contacto).pipe(
      catchError(this.handleError)
    );
  }

  actualizarContacto(id: number, contacto: contactos): Observable<contactos> {
    return this.http.put<contactos>(`${this.baseUrl}/${id}`, contacto).pipe(
      catchError(this.handleError)
    );
  }

  eliminarContacto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error.message);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
