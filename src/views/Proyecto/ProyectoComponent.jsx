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
import { Proyecto } from "./Modelo";

class ProyectoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proyectos: [],
      empresas: this.getEmpresas(),
      programadores: this.getProgramadores(),
      proyecto: new Proyecto("", "", "", "", [], new Date().getTime())
    };
  }

  onDelete = id => {
    const proyectos = this.state.proyectos.filter(e => e.id !== id);
    this.setState({ proyectos });
  };

  onAdd = () => {
    const proyectos = this.state.proyectos.concat(this.state.proyecto);
    this.setState({
      proyectos,
      proyecto: new Proyecto("", "", "", "", [], new Date().getTime())
    });
  };

  onEdit = i => field => e => {
    const proyectos = this.state.proyectos;
    proyectos[i][field] = e.target.value;
    this.setState({ proyectos });
  };

  handleChange = event => {
    const proyecto = this.state.proyecto;
    proyecto[event.target.name] = event.target.value;
    this.setState({ proyecto });
  };

  getEmpresas = () => {
    return [
      { name: "Cobertec", id: 1 },
      { name: "Microsoft", id: 2 },
      { name: "IBM", id: 3 },
      { name: "Mutual", id: 4 }
    ];
  };

  getProgramadores = () => {
    return [
      { name: "Lucas Blanco", id: 1 },
      { name: "Mazoud Joaquin", id: 2 },
      { name: "Juan Accinelli", id: 3 },
      { name: "Federico Hombre", id: 4 }
    ];
  };

  render() {
    return (
      <Grid container>
        <Card>
          <CardHeader color="primary">
            <h4>Crear Proyecto</h4>
            <p>Complete los siguientes campos</p>
          </CardHeader>
          <CardBody>
            <AbmTabla
              onDelete={this.onDelete}
              onAdd={this.onAdd}
              columns={[
                { name: "Nombre", value: "nombre" },
                { name: "Empresa", value: "empresa" },
                { name: "Horas presup.", value: "horasPresupuestadas" },
                { name: "Fecha lim.", value: "fechaLimite" },
                { name: "Programadores", value: "programadores" }
              ]}
              rows={this.state.proyectos.map((e, i) => {
                let programadoresData = e.programadores
                  .map(r => r.name)
                  .join(",");

                return {
                  rowData: {
                    nombre: e.nombre,
                    horasPresupuestadas: e.horasPresupuestadas,
                    fechaLimite: e.fechaLimite,
                    empresa: e.empresa.name,
                    programadores: programadoresData,
                    id: e.id
                  },
                  rowChange: {
                    nombre: (
                      <TextField
                        label="Nombre"
                        onChange={this.onEdit(i)("nombre")}
                        defaultValue={e.nombre}
                      />
                    ),
                    horasPresupuestadas: (
                      <TextField
                        label="Horas presup."
                        onChange={this.onEdit(i)("horasPresupuestadas")}
                        defaultValue={e.horasPresupuestadas}
                        type="number"
                      />
                    ),
                    fechaLimite: (
                      <TextField
                        label="Fecha lim."
                        onChange={this.onEdit(i)("fechaLimite")}
                        defaultValue={e.fechaLimite}
                        type="date"
                      />
                    ),
                    empresa: (
                      <FormControl style={{ width: "80%" }}>
                        <InputLabel htmlFor="select-multiple">
                          Empresa
                        </InputLabel>
                        <Select
                          value={e.empresa}
                          onChange={this.onEdit(i)("empresa")}
                          input={<Input id="select-multiple" />}
                          inputProps={{
                            name: "empresa",
                            id: "empresa"
                          }}
                        >
                          {this.state.empresas.map(empresa => (
                            <MenuItem key={empresa.id} value={empresa}>
                              {empresa.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ),
                    programadores: (
                      <FormControl style={{ width: "80%" }}>
                        <InputLabel htmlFor="select-multiple">
                          Programadores
                        </InputLabel>
                        <Select
                          multiple
                          value={e.programadores}
                          onChange={this.onEdit(i)("programadores")}
                          input={<Input id="select-multiple" />}
                          inputProps={{
                            name: "programadores",
                            id: "programadores"
                          }}
                        >
                          {this.state.programadores.map(programador => (
                            <MenuItem key={programador.id} value={programador}>
                              {programador.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )
                  }
                };
              })}
              alta={{
                nombre: (
                  <TextField
                    label="Nombre"
                    onChange={this.handleChange}
                    defaultValue={this.state.proyecto.nombre}
                    name="nombre"
                  />
                ),
                horasPresupuestadas: (
                  <TextField
                    label="Horas presup."
                    onChange={this.handleChange}
                    defaultValue={this.state.proyecto.horasPresupuestadas}
                    name="horasPresupuestadas"
                    type="number"
                  />
                ),
                fechaLimite: (
                  <TextField
                    label="Fecha lim."
                    onChange={this.handleChange}
                    defaultValue={this.state.proyecto.fechaLimite}
                    type="date"
                    name="fechaLimite"
                  />
                ),
                empresa: (
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel htmlFor="select-multiple">Empresa</InputLabel>
                    <Select
                      value={this.state.proyecto.empresa}
                      onChange={this.handleChange}
                      input={<Input id="select-multiple" />}
                      inputProps={{
                        name: "empresa",
                        id: "empresa"
                      }}
                    >
                      {this.state.empresas.map(empresa => (
                        <MenuItem key={empresa.id} value={empresa}>
                          {empresa.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ),
                programadores: (
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel htmlFor="select-multiple">
                      Programadores
                    </InputLabel>
                    <Select
                      multiple
                      value={this.state.proyecto.programadores}
                      onChange={this.handleChange}
                      input={<Input id="select-multiple" />}
                      inputProps={{
                        name: "programadores",
                        id: "programadores"
                      }}
                    >
                      {this.state.programadores.map(programador => (
                        <MenuItem key={programador.id} value={programador}>
                          {programador.name}
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
              Crear Proyecto
            </Button>
          </CardFooter>
        </Card>
      </Grid>
    );
  }
}

export default ProyectoComponent;
