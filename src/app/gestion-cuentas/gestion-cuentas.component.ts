import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-gestion-cuentas',
  templateUrl: './gestion-cuentas.component.html',
  styleUrls: ['./gestion-cuentas.component.css']
})
export class GestionCuentasComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = { username: '', role: '', password: '' };  // Añadir password aquí

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      users => {
        this.users = users;
        console.log(this.users);  // Verifica que los usuarios tienen un `id`
      },
      error => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.selectedUser.id) {
      this.authService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        () => {
          this.loadUsers();
          this.selectedUser = { username: '', role: '', password: '' };  // Limpiar el formulario
        },
        error => {
          console.error('Error al actualizar usuario', error);
        }
      );
    } else {
      this.authService.createUser(this.selectedUser).subscribe(
        () => {
          this.loadUsers();
          this.selectedUser = { username: '', role: '', password: '' };  // Limpiar el formulario
        },
        error => {
          console.error('Error al crear usuario', error);
        }
      );
    }
  }

  editUser(user: any): void {
    this.selectedUser = { ...user, password: '' };  // Limpiar la contraseña al editar un usuario existente
  }

 // gestion-cuentas.component.ts
 DeleteUser(user: any): void {
  if (user && user.id) {
    this.authService.deleteUser(user.id).subscribe(
      response => {
        console.log('Respuesta del backend:', response);
        alert(response.message); // Asegúrate de que usas la propiedad correcta de la respuesta JSON
        this.loadUsers();
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
        alert('Hubo un error al eliminar el usuario. Detalles: ' + error.error.error);
      }
    );
  } else {
    console.error('El ID del usuario es undefined');
    alert('No se pudo eliminar el usuario. El ID es indefinido.');
  }
}


}

