import * as httpService from "../httpService";

const url = "empresas";
export function alta(empresa) {
  return httpService.post(url, empresa).then(r => {
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
  return httpService.remove(id);
}

export function modificacion({ id, ...empresa }) {
  return httpService.put(url, id, empresa);
}
