import * as httpService from "../httpService";

const url = "asistentes";
export function alta({ id, empresa, ...asistente }) {
  return httpService
    .post(url, { empresa: empresa.id, ...asistente })
    .then(r => {
      return r;
    });
}

export function traerTodos() {
  return httpService.getAll(url);
}

export function traerUno(id) {
  return httpService.getOne(url, id);
}

export function baja(id) {
  return httpService.remove(url, id);
}

export function modificacion({ id, empresa, ...asistente }) {
  return httpService.put(url, id, { empresa: empresa.id, ...asistente });
}
