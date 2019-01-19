export class Responsable {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}
export class Responsabilidad {
  constructor(responsables, tarea, fecha, id) {
    this.responsables = responsables;
    this.tarea = tarea;
    this.fecha = fecha;
    this.id = id;
  }
}
export class Minuta {
  constructor(fecha, motivo, proyecto, descripcion, asistentes, temas) {
    this.fecha = fecha;
    this.motivo = motivo;
    this.descripcion = descripcion;
    this.asistentes = asistentes;
    this.temas = temas;
  }
}

export class Tema {
  constructor(titulo, definiciones) {
    this.titulo = titulo;
    this.definiciones = definiciones;
  }
}
export class Definicion {
  constructor(texto) {
    this.texto = texto;
  }
}
