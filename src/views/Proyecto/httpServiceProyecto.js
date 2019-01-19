import * as httpService from "../httpService";

const url = "proyectos";
export function alta({
  id,
  programadores,
  empresa,
  horasPresupuestadas,
  ...proyecto
}) {
  return httpService
    .post(url, {
      horas_presupuestada: horasPresupuestadas,
      programadores: programadores.map(p => p.id),
      empresa: empresa.id,
      ...proyecto
    })
    .then(r => {
      return r;
    });
}

export function traerTodos() {
  return httpService.getAll(url).then(proyectos =>
    proyectos.map(({ horas_presupuestada, fecha_limite, ...p }) => ({
      horasPresupuestadas: horas_presupuestada,
      fechaLimite: fecha_limite,
      ...p
    }))
  );
}

export function traerUno(id) {
  return httpService
    .getOne(url, id)
    .then(({ horas_presupuestada, fecha_limite, ...p }) => ({
      horasPresupuestadas: horas_presupuestada,
      fechaLimite: fecha_limite,
      ...p
    }));
}

export function baja(id) {
  return httpService.remove(id);
}

export function modificacion({ id, programadores, ...proyecto }) {
  return httpService.put(url, id, {
    programadores: programadores.map(p => p.id),
    ...proyecto
  });
}
