import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../service/Survey.service';
import { Encuesta } from '../model/encuestas/Encuesta';
import { HttpClientModule } from '@angular/common/http';  // Si tu servicio usa HttpClient
import { OnInit } from '@angular/core';
import { SidenavComponent } from "../views/clubes/sidenav/sidenav.component";
import { Respuesta } from '../model/encuestas/Respuesta';
import { RespuestaService } from '../service/Respuesta.service';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-admin-encuesta',
  standalone: true,
  templateUrl: './admin-encuesta.component.html',
  styleUrls: ['./admin-encuesta.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, SidenavComponent, ] // Declaramos aquí las dependencias necesarias
 // Declaramos aquí las dependencias necesarias
})
export class AdminEncuestaComponent implements OnInit, AfterViewInit {

  encuestaForm: FormGroup;
  encuestas: Encuesta[] = [];
  encuestaIdEditando: number | null = null;
  respuestasAgrupadas: number[] = [];
  respuestasSeleccionadas: Respuesta[] = [];
  selectedGroupId: number | null = null;
  mostrarModalEstadisticas = false;
  estadisticas: any;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private respuestaService: RespuestaService 
  ) {
    this.encuestaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      preguntas: this.fb.array([])  // Array de preguntas
    });
    Chart.register(...registerables);  // Registrar todos los componentes necesarios para Chart.js
  }

  ngOnInit(): void {
    this.getEncuestas();
    this.cargarRespuestasAgrupadas();
  }

  ngAfterViewInit(): void {
    if (this.mostrarModalEstadisticas) {
      setTimeout(() => this.generarGraficos(), 0);
    }
  }

  get preguntas(): FormArray {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  getEncuestas(): void {
    this.surveyService.getEncuestas().subscribe({
      next: (response) => {
        this.encuestas = response;
      },
      error: (error) => console.error('Error al obtener encuestas:', error)
    });
  }

  addPregunta(): void {
    const preguntaForm = this.fb.group({
      textoPregunta: ['', Validators.required],
      tipoPregunta: ['', Validators.required],
      opciones: this.fb.array([])  // Array de opciones
    });
    this.preguntas.push(preguntaForm);
  }

  addOpcion(preguntaIndex: number): void {
    const opciones = this.preguntas.at(preguntaIndex).get('opciones') as FormArray;
    const opcionForm = this.fb.group({
      textoOpcion: ['', Validators.required]
    });
    opciones.push(opcionForm);
  }

  getOpciones(preguntaIndex: number): FormArray {
    return this.preguntas.at(preguntaIndex).get('opciones') as FormArray;
  }

  submitEncuesta(): void {
    const encuestaData: Encuesta = this.encuestaForm.value;
    if (this.encuestaIdEditando) {
      this.surveyService.updateEncuesta(this.encuestaIdEditando, encuestaData).subscribe({
        next: () => {
          this.resetFormulario();
          this.getEncuestas();
        },
        error: (error) => console.error('Error al actualizar encuesta:', error)
      });
    } else {
      this.surveyService.createEncuesta(encuestaData).subscribe({
        next: () => {
          this.resetFormulario();
          this.getEncuestas();
        },
        error: (error) => console.error('Error al crear encuesta:', error)
      });
    }
  }

  editEncuesta(id: number): void {
    this.surveyService.getEncuestaById(id).subscribe({
      next: (encuesta) => {
        this.encuestaIdEditando = encuesta.id;
        this.encuestaForm.patchValue({
          titulo: encuesta.titulo,
          descripcion: encuesta.descripcion,
        });

        this.preguntas.clear();
        encuesta.preguntas.forEach((pregunta) => {
          const preguntaForm = this.fb.group({
            textoPregunta: [pregunta.textoPregunta, Validators.required],
            tipoPregunta: [pregunta.tipoPregunta, Validators.required],
            opciones: this.fb.array([])
          });

          const opcionesFormArray = preguntaForm.get('opciones') as FormArray;
          pregunta.opciones.forEach(opcion => {
            opcionesFormArray.push(this.fb.group({
              textoOpcion: [opcion.textoOpcion, Validators.required]
            }));
          });

          this.preguntas.push(preguntaForm);
        });
      },
      error: (error) => console.error('Error al obtener encuesta:', error)
    });
  }

  deleteEncuesta(id: number): void {
    this.surveyService.deleteEncuesta(id).subscribe({
      next: () => {
        this.getEncuestas();
      },
      error: (error) => console.error('Error al eliminar encuesta:', error)
    });
  }

  resetFormulario(): void {
    this.encuestaForm.reset();
    this.preguntas.clear();
    this.encuestaIdEditando = null;
  }

  cargarRespuestasAgrupadas(): void {
    this.respuestaService.getRespuestasAgrupadas().subscribe(
      (data) => this.respuestasAgrupadas = data,
      (error) => console.error('Error al cargar respuestas agrupadas', error)
    );
  }

  abrirModalRespuestas(idRespuestaGrupo: number): void {
    this.selectedGroupId = idRespuestaGrupo;
    this.respuestaService.getRespuestasPorGrupo(idRespuestaGrupo).subscribe(
      (data) => this.respuestasSeleccionadas = data,
      (error) => console.error('Error al cargar respuestas por grupo', error)
    );
  }

  cerrarModal(): void {
    this.selectedGroupId = null;
    this.respuestasSeleccionadas = [];
  }

  verEstadisticas(idEncuesta: number): void {
    this.respuestaService.getEstadisticas(idEncuesta).subscribe((data) => {
      this.estadisticas = data;
      this.mostrarModalEstadisticas = true;
  
      // Usamos setTimeout para asegurar que el DOM está completamente cargado antes de generar los gráficos
      setTimeout(() => this.generarGraficos(), 0);
    });
  }
  
  generarGraficos(): void {
    // Iteramos sobre cada estadística para generar gráficos separados
    this.estadisticas.forEach((estadistica: any, index: number) => {
      const opcionesConteo = estadistica.opcionesConteo;
  
      // Seleccionamos los elementos del canvas por el índice para evitar conflictos entre gráficos
      const barChartCanvas = document.getElementById(`barChart${index}`) as HTMLCanvasElement;
      const pieChartCanvas = document.getElementById(`pieChart${index}`) as HTMLCanvasElement;
  
      // Gráfico de barras
      if (barChartCanvas && barChartCanvas.getContext) {
        const barChart = new Chart(barChartCanvas.getContext('2d')!, {
          type: 'bar',
          data: {
            labels: Object.keys(opcionesConteo),
            datasets: [{
              label: 'Respuestas por opción',
              data: Object.values(opcionesConteo),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          }
        });
      } else {
        console.error("No se pudo encontrar el contexto del gráfico de barras.");
      }
  
      // Gráfico circular (pie)
      if (pieChartCanvas && pieChartCanvas.getContext) {
        const pieChart = new Chart(pieChartCanvas.getContext('2d')!, {
          type: 'pie',
          data: {
            labels: Object.keys(opcionesConteo),
            datasets: [{
              data: Object.values(opcionesConteo),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          }
        });
      } else {
        console.error("No se pudo encontrar el contexto del gráfico circular.");
      }
    });
  }
  

  cerrarModalEstadisticas(): void {
    this.mostrarModalEstadisticas = false;
  }
}