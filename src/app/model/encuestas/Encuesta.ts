import { Pregunta } from "./Pregunta";

export class Encuesta {
    id!: number;
    titulo!: string;
    descripcion!: string;
    preguntas: Pregunta[];
  
    constructor() {
      this.preguntas = [];
    }
  }
  