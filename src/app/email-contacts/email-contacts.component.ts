import { Component, OnInit } from '@angular/core';
import { EmailContact } from '../model/EmailContact';
import { EmailContactService } from '../service/Email.service';

@Component({
  selector: 'app-email-contacts',
  templateUrl: './email-contacts.component.html',
  styleUrls: ['./email-contacts.component.css']
})
export class EmailContactsComponent implements OnInit {
  contacts: EmailContact[] = [];
  selectedContacts: EmailContact[] = [];
  contactActual: EmailContact = { id: 0, nombre: '', email: '' };
  modoEdicion: boolean = false;
  subject: string = '';
  message: string = '';

  constructor(private emailContactService: EmailContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.emailContactService.getAllContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  iniciarEdicion(contact: EmailContact): void {
    this.contactActual = { ...contact };
    this.modoEdicion = true;
  }

  guardar(): void {
    if (this.modoEdicion) {
      this.emailContactService.updateContact(this.contactActual.id, this.contactActual).subscribe(() => {
        this.loadContacts();
        this.modoEdicion = false;
        this.contactActual = { id: 0, nombre: '', email: '' };
      });
    } else {
      this.emailContactService.createContact(this.contactActual).subscribe(() => {
        this.loadContacts();
        this.contactActual = { id: 0, nombre: '', email: '' };
      });
    }
  }

  eliminar(id: number): void {
    this.emailContactService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }

  seleccionarContacto(contact: EmailContact): void {
    const index = this.selectedContacts.indexOf(contact);
    if (index > -1) {
      this.selectedContacts.splice(index, 1);
    } else {
      this.selectedContacts.push(contact);
    }
  }

  enviarCorreo(): void {
    const emails = this.selectedContacts.map(contact => contact.email);
    this.emailContactService.sendEmail(emails, this.subject, this.message).subscribe(() => {
      alert('Correo enviado exitosamente');
      this.selectedContacts = [];
      this.subject = '';
      this.message = '';
    }, error => {
      alert('Error al enviar el correo: ' + error.message);
    });
  }

  limpiarSeleccion(): void {
    this.selectedContacts = [];
  }
}

