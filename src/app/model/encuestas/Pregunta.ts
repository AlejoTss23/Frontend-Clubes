import { Opcion } from "./Opcion";

export class Pregunta {
    idPregunta!: number;
    textoPregunta!: string;
    tipoPregunta!: string;
    opciones: Opcion[];
  
    constructor() {
      this.opciones = [];
    }
  }
  