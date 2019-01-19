import * as httpService from "../httpService";

const url = "programadores";
export function alta(programador) {
  return httpService.post(url, programador).then(r => {
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

export function modificacion({ id, ...programador }) {
  return httpService.put(url, id, programador);
}
