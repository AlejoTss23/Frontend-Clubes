import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Clubes } from 'src/app/model/clubes';
import { ClubesService } from 'src/app/service/clubes.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-clubes-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  templateUrl: './clubes-modal.component.html',
  styleUrls: ['./clubes-modal.component.css']
})
export class ClubesModalComponent implements OnInit {
  clubes!: Clubes;
  

  constructor(
    private dialogRef: MatDialogRef<ClubesModalComponent>,
    private clubesService: ClubesService,
    @Inject(MAT_DIALOG_DATA) private data: Clubes
  ) {}

  ngOnInit(): void {
    this.clubes = new Clubes();
    this.clubes.idClubes = this.data.idClubes;
    this.clubes.nombre = this.data.nombre;
    this.clubes.localidad = this.data.localidad;
    this.clubes.telefono = this.data.telefono;
    this.clubes.departamento = this.data.departamento;
    this.clubes.celular = this.data.celular;
    this.clubes.paginaWeb = this.data.paginaWeb;
    this.clubes.codigoPostal = this.data.codigoPostal;
    this.clubes.fechaFundacion = this.data.fechaFundacion;
    this.clubes.personeriaJuridica = this.data.personeriaJuridica;
    this.clubes.numeroLegajo = this.data.numeroLegajo;
    this.clubes.tipoLegal = this.data.tipoLegal;
    this.clubes.fechaPersoneriaJuridica = this.data.fechaPersoneriaJuridica;
    this.clubes.nodo = this.data.nodo;
    this.clubes.opcionPersoneriaJuridica = this.data.opcionPersoneriaJuridica;
    this.clubes.localidad = this.data.localidad;
    this.clubes.NumeroDeCalle = this.data.NumeroDeCalle;
    this.clubes.mail = this.data.mail;
    this.clubes.facebook = this.data.facebook;
    this.clubes.instagram = this.data.instagram;
    this.clubes.otraredsocial = this.data.otraredsocial
  }



  aceptar() {
    if (this.clubes != null && this.clubes.idClubes > 0) {
      this.clubesService.editar(this.clubes).subscribe(() => {
        return this.clubesService.listar().subscribe(data => {
          this.clubesService.clubesActualizar.next(data);
        });
      });
    } else {
      this.clubesService.registrar(this.clubes).subscribe(() => {
        this.clubesService.listar().subscribe(data => {
          this.clubesService.clubesActualizar.next(data);
        });
      });
    }

    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
