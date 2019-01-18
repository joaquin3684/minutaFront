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
import { Asistente } from "./Modelo";

class AsistenteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asistentes: [],
      empresas: this.getEmpresas(),
      asistente: new Asistente("", "", "", "", new Date().getTime())
    };
  }

  onDelete = (id) => {
    const asistentes = this.state.asistentes.filter( e => e.id !== id)
    this.setState({asistentes})
  };

  onAdd = () => {
    const asistentes = this.state.asistentes.concat(
      this.state.asistente
    );
    this.setState({ asistentes, asistente: new Asistente("", "", "", "", new Date().getTime())});
  };

  onEdit = i => field => e => {
    const asistentes = this.state.asistentes
    asistentes[i][field] = e.target.value
    this.setState({asistentes})
  };

  handleChange = event => {
    const asistente = this.state.asistente
    asistente[event.target.name] = event.target.value
    this.setState({ asistente});
  };

  getEmpresas = () => {
    return [
      {name: 'Cobertec', id:1},
      {name: 'Microsoft', id:2},
      {name: 'IBM', id:3},
      {name: 'Mutual', id:4},
    ]
  }

  render() {
    return (
      <Grid container>
        <Card>
          <CardHeader color="primary">
            <h4>Crear Empleado</h4>
            <p>Complete los siguientes campos</p>
          </CardHeader>
          <CardBody>
            <AbmTabla
              onDelete={this.onDelete}
              onAdd={this.onAdd}
              columns={[{name: "Nombre", value: "nombre"},{name: "Apellido", value: "apellido"},{name: "Mail", value: "mail"}, { name: "Empresa", value: "empresa" }]}
              rows={this.state.asistentes.map((e, i) => {
                return {
                  rowData: { nombre: e.nombre, apellido:e.apellido, mail:e.mail, empresa:e.empresa.name, id: e.id },
                  rowChange: {
                    nombre: (
                      <TextField
                        label="Nombre"
                        onChange={this.onEdit(i)("nombre")}
                        defaultValue={e.nombre}
                      />
                    ),
                    apellido: (
                      <TextField
                        label="Nombre"
                        onChange={this.onEdit(i)("apellido")}
                        defaultValue={e.apellido}
                      />
                    ),
                    mail: (
                      <TextField
                        label="Nombre"
                        onChange={this.onEdit(i)("mail")}
                        defaultValue={e.mail}
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
                    )

                  }
                };
              })}
              alta={{
                nombre: (
                  <TextField
                    label="Nombre"
                    onChange={this.handleChange}
                    value={this.state.asistente.nombre}
                    name="nombre"
                  />
                ),
                apellido: (
                  <TextField
                    label="Apellido"
                    onChange={this.handleChange}
                    name="apellido"
                    defaultValue={this.state.asistente.apellido}
                  />
                ),
                mail: (
                  <TextField
                    label="Mail"
                    onChange={this.handleChange}
                    defaultValue={this.state.asistente.mail}
                    name="mail"
                  />
                ),
                empresa: (
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel htmlFor="select-multiple">
                      Empresa
                    </InputLabel>
                    <Select
                      value={this.state.asistente.empresa}
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

export default AsistenteComponent;
