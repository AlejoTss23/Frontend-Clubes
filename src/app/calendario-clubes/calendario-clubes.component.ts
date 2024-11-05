import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../service/calendario.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface ClubDTO {
  nombre: string;
  fechaFundacion: string;
}

@Component({
  selector: 'app-calendario-clubes',
  templateUrl: './calendario-clubes.component.html',
  styleUrls: ['./calendario-clubes.component.css']
})
export class CalendarioClubesComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
  };

  constructor(private clubesService: CalendarioService) { }

  ngOnInit(): void {
    this.clubesService.listarNombresYFechas().subscribe((data: ClubDTO[]) => {
      const eventos = data.map(club => {
        const [month, day] = club.fechaFundacion.split('-');
        console.log(`Club: ${club.nombre}, Fecha Original: ${club.fechaFundacion}`);

        return {
          title: `Aniversario de ${club.nombre}`,
          startRecur: `2024-${month}-${day}`, // Fecha de inicio de recurrencia
          endRecur: '2025-12-31', // Limitar la recurrencia a un solo año por ahora
          startTime: '00:00',
          allDay: true,
          backgroundColor: '#ff9f89', // Color de fondo del evento
          borderColor: '#ff9f89',     // Color del borde del evento
          textColor: '#000',          // Color del texto del evento
          display: 'background',      // Configura el evento como de fondo
        };
      });

      // Actualizar las opciones del calendario con los eventos construidos
      this.calendarOptions = {
        ...this.calendarOptions,
        events: eventos
      };

      console.log('Eventos construidos:', eventos);
    });
  }
}


