export class Proyecto {
  constructor(
    nombre = "",
    empresa = "",
    horasPresupuestadas = "",
    fechaLimite = "",
    programadores = [],
    id = ""
  ) {
    this.nombre = nombre;
    this.horasPresupuestadas = horasPresupuestadas;
    this.fechaLimite = fechaLimite;
    this.empresa = empresa;
    this.programadores = programadores;
    this.id = id;
  }
}
