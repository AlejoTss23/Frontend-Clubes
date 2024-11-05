import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailContact } from '../model/EmailContact';

@Injectable({
  providedIn: 'root'
})
export class EmailContactService {

  private baseUrl = 'http://localhost:8080/api/email-contacts';  // Asegúrate de que esta URL sea correcta
  private emailUrl = 'http://localhost:8080/api/emails/send';

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<EmailContact[]> {
    return this.http.get<EmailContact[]>(this.baseUrl);
  }

  getContactById(id: number): Observable<EmailContact> {
    return this.http.get<EmailContact>(`${this.baseUrl}/${id}`);
  }

  createContact(contact: EmailContact): Observable<EmailContact> {
    return this.http.post<EmailContact>(this.baseUrl, contact);
  }

  updateContact(id: number, contact: EmailContact): Observable<EmailContact> {
    return this.http.put<EmailContact>(`${this.baseUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  sendEmail(to: string[], subject: string, text: string): Observable<void> {
    const emailRequest = { to, subject, text };
    return this.http.post<void>(this.emailUrl, emailRequest);
  }
}

