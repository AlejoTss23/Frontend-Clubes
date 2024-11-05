import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../service/Survey.service';
import { RespuestaService } from '../service/Respuesta.service';
import { Encuesta } from '../model/encuestas/Encuesta';
import { Respuesta } from '../model/encuestas/Respuesta';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css']
})
export class ResponderEncuestaComponent implements OnInit {
  encuesta: Encuesta | undefined;
  respuestas: { [key: number]: string | number | number[] } = {};  // Soporte para múltiples respuestas

  constructor(
    private route: ActivatedRoute,
    private encuestaService: SurveyService,
    private respuestaService: RespuestaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const encuestaId = this.route.snapshot.paramMap.get('id');
    if (encuestaId) {
      this.obtenerEncuesta(parseInt(encuestaId, 10));
    } else {
      console.error('ID de encuesta no encontrado');
    }
  }

  obtenerEncuesta(encuestaId: number): void {
    this.encuestaService.getEncuestaPublicaById(encuestaId).subscribe(
      (data: Encuesta) => {
        this.encuesta = data;
        console.log('Encuesta obtenida:', this.encuesta);  // Verificar en la consola
      },
      (error) => {
        console.error('Error al obtener la encuesta:', error);
      }
    );
  }

  // Manejar las selecciones de checkboxes
  onCheckboxChange(event: any, preguntaId: number, opcionId: number): void {
    if (!Array.isArray(this.respuestas[preguntaId])) {
      this.respuestas[preguntaId] = [];
    }

    const selectedOptions = this.respuestas[preguntaId] as number[];

    if (event.target.checked) {
      selectedOptions.push(opcionId);
    } else {
      const index = selectedOptions.indexOf(opcionId);
      if (index > -1) {
        selectedOptions.splice(index, 1);
      }
    }

    this.respuestas[preguntaId] = selectedOptions;
  }

  // Verificar si un checkbox debe estar marcado
  isChecked(preguntaId: number, opcionId: number): boolean {
    const selectedOptions = this.respuestas[preguntaId];
    return Array.isArray(selectedOptions) && selectedOptions.includes(opcionId);
  }

  enviarRespuestas(): void {
    if (!this.encuesta) {
      console.error('Encuesta no definida');
      return;
    }
  
    const respuestasArray: Respuesta[] = Object.keys(this.respuestas).map((key) => {
      const preguntaId = parseInt(key, 10);
  
      return {
        preguntaId,
        respuestaTexto: typeof this.respuestas[preguntaId] === 'string' ? this.respuestas[preguntaId] as string : undefined,
        respuestaNumero: typeof this.respuestas[preguntaId] === 'number' ? this.respuestas[preguntaId] as number : undefined,
        opcionIds: Array.isArray(this.respuestas[preguntaId]) ? this.respuestas[preguntaId] as number[] : undefined,
        encuestaId: this.encuesta!.id
      };
    });
  
    console.log('Respuestas que se enviarán:', respuestasArray);  // <--- Agregar este log
  
    this.respuestaService.enviarRespuestas(respuestasArray).subscribe(
      () => {
        alert('Respuestas enviadas con éxito');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error al enviar las respuestas:', error);
      }
    );
  }  
}












