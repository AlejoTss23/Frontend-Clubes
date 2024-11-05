export class Respuesta {
    preguntaId!: number;
    opcionId?: number;  // Opcional, dependiendo del tipo de pregunta
    respuestaTexto?: string;  // Opcional, para preguntas de texto
    respuestaNumero?: number;  // Opcional, para preguntas de tipo número
    textoOpcion?: String;
    textoPregunta?: String;
    idRespuesta?: number;

    
    constructor() {}
  }
  