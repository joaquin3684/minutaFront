import axios from "axios";

const url = "http://localhost:8000/api/";

export function post(ruta, json) {
  return axios
    .post(url + ruta + "/", json)
    .then(r => {
      console.log("Response: " + ruta, r);
      return r.data;
    })
    .catch(e => console.error("Response: " + ruta, e));
}

export function getAll(ruta, json) {
  return axios
    .get(url + ruta + "/", json)
    .then(r => {
      console.log("Response: " + ruta, r);
      return r.data;
    })
    .catch(e => console.error("Response: " + ruta, e));
}

export function getOne(ruta, id) {
  return axios
    .get(url + ruta + "/" + id + "/")
    .then(r => {
      console.log("Response: " + ruta, r);
      return r.data;
    })
    .catch(e => console.error("Response: " + ruta, e));
}

export function remove(ruta, id) {
  return axios
    .delete(url + ruta + "/" + id + "/")
    .then(r => {
      console.log("Response: " + ruta, r);
      return r.data;
    })
    .catch(e => console.error("Response: " + ruta, e));
}

export function put(ruta, id, json) {
  return axios
    .put(url + ruta + "/" + id + "/", json)
    .then(r => {
      console.log("Response: " + ruta, r);
      return r.data;
    })
    .catch(e => console.error("Response: " + ruta, e));
}
