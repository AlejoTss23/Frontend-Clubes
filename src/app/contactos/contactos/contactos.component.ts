import { Component, OnInit } from '@angular/core';
import { contactos } from 'src/app/model/contactos';
import { ContactoService } from 'src/app/service/contactos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from "../../views/clubes/sidenav/sidenav.component";

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SidenavComponent
],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  contactos: contactos[] = [];
  contactosFiltrados: contactos[] = [];
  contactoActual: contactos = this.resetearContacto();
  modoEdicion: boolean = false;
  filtro: string = '';

  constructor(private contactoService: ContactoService) { }

  ngOnInit(): void {
    this.cargarContactos();
  }

  cargarContactos(): void {
    this.contactoService.obtenerContactos().subscribe({
      next: (data) => {
        this.contactos = data;
        this.contactosFiltrados = data;
      },
      error: (e) => {
        console.error("Error al cargar contactos:", e);
        alert('Error al cargar contactos: ' + e.message);
      }
    });
  }

  filtrarContactos(): void {
    if (this.filtro.trim()) {
      const filtroLowerCase = this.filtro.toLowerCase();
      this.contactosFiltrados = this.contactos.filter(contacto =>
        contacto.nombre.toLowerCase().includes(filtroLowerCase) ||
        contacto.telefonoPrincipal.toLowerCase().includes(filtroLowerCase) ||
        (contacto.telefonoSecundario && contacto.telefonoSecundario.toLowerCase().includes(filtroLowerCase)) ||
        (contacto.telefonoTerciario && contacto.telefonoTerciario.toLowerCase().includes(filtroLowerCase))
      );
    } else {
      this.contactosFiltrados = this.contactos;
    }
  }

  limpiarFiltro(): void {
    this.filtro = '';
    this.contactosFiltrados = this.contactos;
  }

  iniciarEdicion(contacto: contactos): void {
    this.contactoActual = { ...contacto };
    this.modoEdicion = true;
  }

  guardar(): void {
    if (this.modoEdicion) {
      this.contactoService.actualizarContacto(this.contactoActual.id, this.contactoActual).subscribe({
        next: () => {
          this.cargarContactos();
          this.modoEdicion = false;
          this.contactoActual = this.resetearContacto();
        },
        error: (e) => {
          console.error("Error al actualizar contacto:", e);
          alert('Error al actualizar contacto: ' + e.message);
        }
      });
    } else {
      this.contactoService.crearContacto(this.contactoActual).subscribe({
        next: () => {
          this.cargarContactos();
          this.contactoActual = this.resetearContacto();
        },
        error: (e) => {
          console.error("Error al crear contacto:", e);
          alert('Error al crear contacto: ' + e.message);
        }
      });
    }
  }

  eliminar(id: number): void {
    this.contactoService.eliminarContacto(id).subscribe({
      next: () => this.cargarContactos(),
      error: (e) => {
        console.error("Error al eliminar contacto:", e);
        alert('Error al eliminar contacto: ' + e.message);
      }
    });
  }

  resetearContacto(): contactos {
    return {
      id: 0,
      nombre: '',
      telefonoPrincipal: '',
      telefonoSecundario: '',
      telefonoTerciario: ''
    };
  }
}
