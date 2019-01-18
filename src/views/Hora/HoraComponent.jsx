import React from "react";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import AbmTabla from "../../components/Abm/AbmTabla";
import Select from "@material-ui/core/Select";

import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { Hora } from "./Modelo";

class HoraComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      horas: [],
      proyectos: this.getProyectos(),
      programadores: this.getProgramadores(),
      hora: new Hora("", "", "", "", "", new Date().getTime())
    };
  }

  onDelete = (id) => {
    const horas = this.state.horas.filter( e => e.id !== id)
    this.setState({horas})
  };

  onAdd = () => {
    const horas = this.state.horas.concat(
      this.state.hora
    );
    this.setState({ horas, hora: new Hora("", "", "", "", "", new Date().getTime())});
  };

  onEdit = i => field => e => {
    const horas = this.state.horas
    horas[i][field] = e.target.value
    this.setState({horas})
  };

  handleChange = event => {
    const hora = this.state.hora
    hora[event.target.name] = event.target.value
    this.setState({ hora});
  };

  getProyectos = () => {
    return [
      {name: 'Cobertec', id:1},
      {name: 'Microsoft', id:2},
      {name: 'IBM', id:3},
      {name: 'Mutual', id:4},
    ]
  }

  getProgramadores = () => {
    return [
      {name: 'Lucas Blanco', id:1},
      {name: 'Joaquin Mazoud', id:2},
      {name: 'Federico Hombre', id:3},
      {name: 'Juan Puto', id:4},
    ]
  }

  render() {
    return (
      <Grid container>
        <Card>
          <CardHeader color="primary">
            <h4>ABM Hora</h4>
            <p>Complete los siguientes campos</p>
          </CardHeader>
          <CardBody>
            <AbmTabla
              onDelete={this.onDelete}
              onAdd={this.onAdd}
              columns={[{name: "Proyecto", value: "proyecto"},{name: "Programador", value: "programador"},{name: "N° Horas", value: "cantidadHoras"}, { name: "Fecha", value: "fecha" }, { name: "Descripcion", value: "descripcion" }]}
              rows={this.state.horas.map((e, i) => {
                return {
                  rowData: { cantidadHoras: e.cantidadHoras, fecha:e.fecha, programador:e.programador.name, proyecto:e.proyecto.name, descripcion:e.descripcion, id: e.id },
                  rowChange: {
                    cantidadHoras: (
                      <TextField
                        label="N° Horas"
                        onChange={this.onEdit(i)("cantidadHoras")}
                        defaultValue={e.cantidadHoras}
                        type="number"
                      />
                    ),
                    fecha: (
                      <TextField
                        label="Fecha"
                        onChange={this.onEdit(i)("fecha")}
                        defaultValue={e.fecha}
                        type="date"
                      />
                    ),
                    descripcion: (
                      <TextField
                        label="Descripcion"
                        onChange={this.onEdit(i)("descripcion")}
                        defaultValue={e.descripcion}
                      />
                    ),
                    programador: (
                      <FormControl style={{ width: "80%" }}>
                        <InputLabel htmlFor="select-multiple">
                          Programador
                        </InputLabel>
                        <Select
                          value={e.programador}
                          onChange={this.onEdit(i)("programador")}
                          input={<Input id="select-multiple" />}
                          inputProps={{
                            name: "programador",
                            id: "programador"
                          }}
                        >
                          {this.state.programadores.map(programador => (
                            <MenuItem key={programador.id} value={programador}>
                              {programador.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ),
                    proyecto: (
                      <FormControl style={{ width: "80%" }}>
                        <InputLabel htmlFor="select-multiple">
                          Proyecto
                        </InputLabel>
                        <Select
                          value={e.proyecto}
                          onChange={this.onEdit(i)("proyecto")}
                          input={<Input id="select-multiple" />}
                          inputProps={{
                            name: "proyecto",
                            id: "proyecto"
                          }}
                        >
                          {this.state.proyectos.map(proyecto => (
                            <MenuItem key={proyecto.id} value={proyecto}>
                              {proyecto.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )

                  }
                };
              })}
              alta={{
                cantidadHoras: (
                  <TextField
                    label="N° Horas"
                    onChange={this.handleChange}
                    defaultValue={this.state.hora.cantidadHoras}
                    type="number"
                    name="cantidadHoras"
                  />
                ),
                fecha: (
                  <TextField
                    label="Fecha"
                    onChange={this.handleChange}
                    defaultValue={this.state.hora.fecha}
                    type="date"
                    name="fecha"
                  />
                ),
                descripcion: (
                  <TextField
                    label="Descripcion"
                    onChange={this.handleChange}
                    defaultValue={this.state.hora.descripcion}
                    name="descripcion"
                  />
                ),
                programador: (
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel htmlFor="select-multiple">
                      Programador
                    </InputLabel>
                    <Select
                      value={this.state.hora.programador}
                      onChange={this.handleChange}
                      input={<Input id="select-multiple" />}
                      inputProps={{
                        name: "programador",
                        id: "programador"
                      }}
                    >
                      {this.state.programadores.map(programador => (
                        <MenuItem key={programador.id} value={programador}>
                          {programador.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ),
                proyecto: (
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel htmlFor="select-multiple">
                      Proyecto
                    </InputLabel>
                    <Select
                      value={this.state.hora.proyecto}
                      onChange={this.handleChange}
                      input={<Input id="select-multiple" />}
                      inputProps={{
                        name: "proyecto",
                        id: "proyecto"
                      }}
                    >
                      {this.state.proyectos.map(proyecto => (
                        <MenuItem key={proyecto.id} value={proyecto}>
                          {proyecto.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )
              }}
            />
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={this.altaMinuta}>
              Crear Empleado
            </Button>
          </CardFooter>
        </Card>
      </Grid>
    );
  }
}

export default HoraComponent;
