import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Clubes } from 'src/app/model/clubes';
import { ClubesService } from 'src/app/service/clubes.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ClubesModalComponent } from './clubes-modal/clubes-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetailModalComponent } from 'src/app/detail-modal/detail-modal.component'; // Asegúrate de importar el componente de detalles
import { Respuesta } from 'src/app/model/encuestas/Respuesta';
import { RespuestaService } from 'src/app/service/Respuesta.service';


@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.css']
})
export class ClubesComponent implements OnInit {
  respuestasAsociadas: any[] = [];  // Respuestas asociadas al club
  mostrarModalRespuestas = false; // Controlar el modal para agregar respuestas
  mostrarModalVerRespuestas = false; // Controlar el modal para ver respuestas
  selectedClubId: number | null = null; // ID del club seleccionado
  respuestasDisponibles: number[] = []; // Cambiar de Respuesta[] a number[]
  
  displayedColumns = ['idClubes', 'nombre', 'agregar-respuesta', 'editar-eliminar'];
  dataSource!: MatTableDataSource<Clubes>;
  clubes!: Clubes[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cant: number = 0;

  constructor(
    private clubesService: ClubesService, 
    private dialog: MatDialog, 
    private respuestaService: RespuestaService
  ) {}

  ngOnInit(): void {
    this.clubesService.clubesActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.clubesService.listPageable(0, 10).subscribe(data => {
      this.cant = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openModal(clubes?: Clubes) {
    let club = clubes != null ? clubes : new Clubes();
    this.dialog.open(ClubesModalComponent, {
      width: '260px',
      data: club
    });
  }

  openDetailModal(club: Clubes) {
    this.dialog.open(DetailModalComponent, {
      width: '600px',
      data: { club: club }
    });
  }

  onDelete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {});

    dialogRef.afterClosed().subscribe(estado => {
      if (estado) {
        this.clubesService.eliminar(id).subscribe(() => {
          this.clubesService.listar().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
          });
        });
      }
    });
  }

  Paginator(e: any): void {
    this.clubesService.listPageable(e.pageIndex, e.pageSize).subscribe(
      (data) => {
        this.cant = data.totalElements;
        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al obtener los datos paginados:', error);
      }
    );
  }

  filtrar(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirModalRespuestas(idClubes: number): void {
    this.selectedClubId = idClubes;
    this.respuestaService.getRespuestasAgrupadas().subscribe(
      (ids: number[]) => {
        const validIds = ids.filter(id => id !== null && id !== undefined);
        if (validIds.length > 0) {
          this.respuestasDisponibles = validIds;
          this.mostrarModalRespuestas = true;
        } else {
          console.warn('No se encontraron grupos de respuestas para este club.');
        }
      },
      (error) => {
        console.error('Error al cargar respuestas agrupadas', error);
      }
    );
  }

  cerrarModalRespuestas(): void {
    this.mostrarModalRespuestas = false;
  }

  seleccionarRespuestaGrupo(idRespuesta: number): void {
    const clubConRespuestaGrupo = {
      idClubes: this.selectedClubId!,
      idRespuestaGrupo: idRespuesta
    };

    this.clubesService.asociarRespuestaAClub(clubConRespuestaGrupo).subscribe(
      () => {
        console.log('Respuestas del grupo asociadas correctamente');
        this.mostrarModalRespuestas = false;
      },
      (error) => {
        console.error('Error al asociar grupo de respuestas', error);
      }
    );
  }

  verRespuestasAsociadas(idClubes: number): void {
    this.selectedClubId = idClubes;
    this.clubesService.obtenerRespuestasPorClub(idClubes).subscribe(
      (clubRespuestaDTO) => {
        console.log('Respuestas asociadas al club:', clubRespuestaDTO.respuestas);
        this.respuestasAsociadas = clubRespuestaDTO.respuestas;
        this.mostrarModalVerRespuestas = true;
      },
      (error) => {
        console.error('Error al obtener respuestas asociadas', error);
      }
    );
  }

  cerrarModalVerRespuestas(): void {
    this.mostrarModalVerRespuestas = false;
  }
}




