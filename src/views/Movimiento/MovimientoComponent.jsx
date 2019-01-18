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
import { Movimiento } from "./Modelo";

class MovimientoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movimientos: [],
      programadores: this.getProgramadores(),
      movimiento: new Movimiento("", "", "", "", "", new Date().getTime())
    };
  }

  onDelete = (id) => {
    const movimientos = this.state.movimientos.filter( e => e.id !== id)
    this.setState({movimientos})
  };

  onAdd = () => {
    const movimientos = this.state.movimientos.concat(
      this.state.movimiento
    );
    this.setState({ movimientos, movimiento: new Movimiento("", "", "", "", "", new Date().getTime())});
  };

  onEdit = i => field => e => {
    const movimientos = this.state.movimientos
    movimientos[i][field] = e.target.value
    this.setState({movimientos})
  };

  getProgramadores = () => {
    return [
      { name: "Lucas Blanco", id: 1 },
      { name: "Mazoud Joaquin", id: 2 },
      { name: "Juan Accinelli", id: 3 },
      { name: "Federico Hombre", id: 4 }
    ];
  };

  handleChange = event => {
    const movimiento = this.state.movimiento
    movimiento[event.target.name] = event.target.value
    this.setState({ movimiento});
  };


  render() {
    return (
      <Grid container>
        <Card>
          <CardHeader color="primary">
            <h4>Crear Movimiento</h4>
            <p>Complete los siguientes campos</p>
          </CardHeader>
          <CardBody>
            <AbmTabla
              onDelete={this.onDelete}
              onAdd={this.onAdd}
              columns={[{name: "Concepto", value: "concepto"},{name: "Descripcion", value: "descripcion"},{name: "Programador", value: "programador"}, { name: "Fecha", value: "fecha" }, { name: "Monto", value: "monto" }]}
              rows={this.state.movimientos.map((e, i) => {
                return {
                  rowData: { concepto: e.concepto, descripcion:e.descripcion, programador:e.programador.name, fecha:e.fecha, monto:e.monto, id: e.id },
                  rowChange: {
                    concepto: (
                      <TextField
                        label="Concepto"
                        onChange={this.onEdit(i)("concepto")}
                        defaultValue={e.concepto}
                      />
                    ),
                    descripcion: (
                      <TextField
                        label="Descripcion"
                        onChange={this.onEdit(i)("descripcion")}
                        defaultValue={e.descripcion}
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
                    monto: (
                      <TextField
                        label="monto"
                        onChange={this.onEdit(i)("monto")}
                        defaultValue={e.monto}
                        type="number"
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
                          {this.state.programadores.map(programadores => (
                            <MenuItem key={programadores.id} value={programadores}>
                              {programadores.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )

                  }
                };
              })}
              alta={{
                concepto: (
                  <TextField
                    label="Concepto"
                    onChange={this.handleChange}
                    defaultValue={this.state.movimiento.concepto}
                    name="concepto"
                  />
                ),
                descripcion: (
                  <TextField
                    label="Descripcion"
                    onChange={this.handleChange}
                    defaultValue={this.state.movimiento.descripcion}
                    name="descripcion"
                  />
                ),
                fecha: (
                  <TextField
                    label="Fecha"
                    onChange={this.handleChange}
                    defaultValue={this.state.movimiento.fecha}
                    type="date"
                    name="fecha"
                  />
                ),
                monto: (
                  <TextField
                    label="monto"
                    onChange={this.handleChange}
                    defaultValue={this.state.movimiento.monto}
                    type="number"
                    name="monto"
                  />
                ),
                programador: (
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel htmlFor="select-multiple">
                      Programador
                    </InputLabel>
                    <Select
                      value={this.state.movimiento.programador}
                      onChange={this.handleChange}
                      input={<Input id="select-multiple" />}
                      inputProps={{
                        name: "programador",
                        id: "programador"
                      }}
                    >
                      {this.state.programadores.map(programadores => (
                        <MenuItem key={programadores.id} value={programadores}>
                          {programadores.name}
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
              Crear Movimiento
            </Button>
          </CardFooter>
        </Card>
      </Grid>
    );
  }
}

export default MovimientoComponent;
