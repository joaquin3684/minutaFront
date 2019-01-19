import * as httpService from "../httpService";

export function alta(minuta) {
  httpService.post("minutas/", minuta);
}

export function baja({ id }) {
  httpService.remove("minutas/" + id, { id });
}

export function modificacion(minuta) {
  httpService.put("minutas/" + minuta.id, minuta);
}
