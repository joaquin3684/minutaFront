import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import AbmTabla from "../../components/Abm/AbmTabla";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import * as httpService from "./httpServiceProgramador";
import { Programador } from "./Modelo";

class ProgramadorComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      programador: new Programador(),
      programadores: []
    };
  }

  componentDidMount() {
    httpService
      .traerTodos()
      .then(programadores => this.setState({ programadores }));
  }

  onDelete = id => {
    httpService.baja(id).then(() => {
      const programadores = this.state.programadores.filter(e => e.id !== id);
      this.setState({ programadores });
    });
  };

  onAdd = () => {
    httpService.alta(this.state.programador).then(newProgramador => {
      const programadores = this.state.programadores.concat(newProgramador);
      this.setState({ programadores, programador: new Programador() });
    });
  };

  onChange = i => field => value => {
    const programadores = this.state.programadores;
    programadores[i][field] = value;
    this.setState({ programadores });
  };

  onEdit = id => {
    const programador = this.state.programadores.find(e => e.id === id);
    httpService.modificacion(programador).catch(() => {
      this.onCancelEdit(programador.id);
    });
  };

  onCancelEdit = id => {
    httpService.traerUno(id).then(programador => {
      const programadores = this.state.programadores;
      const i = programadores.findIndex(e => e.id === id);
      programadores[i] = programador;
      this.setState({ programadores });
    });
  };

  handleChange = field => value => {
    const programador = this.state.programador;
    programador[field] = value;
    this.setState({ programador });
  };

  render() {
    return (
      <Grid container>
        <Card>
          <CardHeader color="primary">
            <h4>Crear Programador</h4>
            <p>Complete los siguientes campos</p>
          </CardHeader>
          <CardBody>
            <AbmTabla
              onDelete={this.onDelete}
              onAdd={this.onAdd}
              onEdit={this.onEdit}
              onCancelEdit={this.onCancelEdit}
              columns={[
                { name: "Nombre", value: "nombre" },
                { name: "Apellido", value: "apellido" },
                { name: "Mail", value: "mail" },
                { name: "Es socio", value: "es_socio" }
              ]}
              rows={this.state.programadores.map((e, i) => {
                return {
                  rowData: {
                    nombre: e.nombre,
                    apellido: e.apellido,
                    mail: e.mail,
                    es_socio: e.es_socio,
                    id: e.id
                  },
                  rowChange: {
                    nombre: (
                      <TextField
                        label="Nombre"
                        onChange={e =>
                          this.onChange(i)("nombre")(e.target.value)
                        }
                        defaultValue={e.nombre}
                      />
                    ),
                    apellido: (
                      <TextField
                        label="Apellido"
                        onChange={e =>
                          this.onChange(i)("apellido")(e.target.value)
                        }
                        defaultValue={e.apellido}
                      />
                    ),
                    mail: (
                      <TextField
                        label="Mail"
                        onChange={e => this.onChange(i)("mail")(e.target.value)}
                        defaultValue={e.mail}
                      />
                    ),
                    es_socio: (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={e.es_socio}
                            onChange={e =>
                              this.onChange(i)("es_socio")(e.target.checked)
                            }
                            value={e.es_socio}
                            color="primary"
                          />
                        }
                        label="Es socio"
                      />
                    )
                  }
                };
              })}
              alta={{
                nombre: (
                  <TextField
                    label="Nombre"
                    onChange={e => this.handleChange("nombre")(e.target.value)}
                    defaultValue={this.state.programador.nombre}
                  />
                ),
                apellido: (
                  <TextField
                    label="Apellido"
                    name="apellido"
                    onChange={e =>
                      this.handleChange("apellido")(e.target.value)
                    }
                    defaultValue={this.state.programador.apellido}
                  />
                ),
                mail: (
                  <TextField
                    label="Mail"
                    name="mail"
                    onChange={e => this.handleChange("mail")(e.target.value)}
                    defaultValue={this.state.programador.mail}
                  />
                ),
                es_socio: (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.programador.es_socio}
                        name="es_socio"
                        onChange={e =>
                          this.handleChange("es_socio")(e.target.checked)
                        }
                        value={this.state.programador.es_socio}
                        color="primary"
                      />
                    }
                    label="Es socio"
                  />
                )
              }}
            />
          </CardBody>
          <CardFooter />
        </Card>
      </Grid>
    );
  }
}

export default ProgramadorComponent;
