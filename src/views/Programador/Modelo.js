export class Programador {
  constructor(
    nombre = "",
    apellido = "",
    mail = "",
    dni = "",
    es_socio = false,
    id = ""
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
    this.dni = dni;
    this.es_socio = es_socio;
    this.id = id;
  }
}
