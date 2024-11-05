import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Cambia la base URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('jwtToken', response.token);
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al crear usuario', error);
          return throwError(() => new Error('Error al crear usuario: ' + error.message));
        })
      );
  }
  
  
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
  
  changePassword(id: number, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}/change-password`, { newPassword });
  }
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }
}
