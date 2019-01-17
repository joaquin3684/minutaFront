import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import AbmTabla from "components/Abm/AbmTabla.jsx";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { Responsabilidad, Responsable } from "./modelos";

class MinutaTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newResp: new Responsabilidad([], "", "", new Date().getTime()),
      hola: [1]
    };
  }

  handleChange = field => e => {
    let { newResp } = this.state;
    newResp[field] = e.target.value;
    this.setState({ newResp });
  };

  handleChange2 = e => {
    console.log("Antes", this.state.hola);
    this.setState({ hola: e.target.value }, () => console.log(this.state.hola));
  };

  onAdd = () => {
    this.props.onAdd(this.state.newResp);
    this.setState({
      newResp: new Responsabilidad([], "", "", new Date().getTime())
    });
  };

  render() {
    let { responsabilidades, todosResponsables, onDelete, onEdit } = this.props;
    return (
      <AbmTabla
        onDelete={onDelete}
        onAdd={this.onAdd}
        columns={[
          { name: "Responsables", value: "responsables" },
          { name: "Tarea", value: "tarea" },
          { name: "Fecha", value: "fecha" }
        ]}
        rows={responsabilidades.map((r, i) => {
          let { responsables, ...rest } = r;
          let responsablesData = responsables.map(r => r.name).join(",");
          return {
            rowData: { responsables: responsablesData, ...rest },
            rowChange: {
              responsables: (
                <FormControl>
                  <InputLabel htmlFor="select-multiple">
                    Responsables
                  </InputLabel>
                  <Select
                    multiple
                    value={responsables}
                    onChange={onEdit(i)("responsables")}
                    input={<Input id="select-multiple" />}
                    inputProps={{
                      name: "responsables",
                      id: "responsables"
                    }}
                  >
                    {todosResponsables.map(resp => (
                      <MenuItem key={resp.id} value={resp}>
                        {resp.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ),
              tarea: (
                <TextField
                  label="Tarea"
                  onChange={onEdit(i)("tarea")}
                  defaultValue={r.tarea}
                />
              ),
              fecha: (
                <TextField
                  label="Fecha"
                  type="date"
                  onChange={onEdit(i)("fecha")}
                  defaultValue={r.fecha}
                />
              )
            }
          };
        })}
        alta={{
          responsables: (
            <FormControl style={{ width: "80%" }}>
              <InputLabel htmlFor="age-simple">Responsables</InputLabel>
              <Select
                multiple
                value={this.state.newResp.responsables}
                onChange={this.handleChange("responsables")}
                input={<Input id="age-simple" />}
                inputProps={{
                  name: "responsables",
                  id: "responsables"
                }}
              >
                {todosResponsables.map(resp => (
                  <MenuItem key={resp.id} value={resp}>
                    {resp.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ),
          tarea: (
            <TextField
              label="Tarea"
              onChange={this.handleChange("tarea")}
              value={this.state.newResp.tarea}
              style={{ width: "80%" }}
            />
          ),
          fecha: (
            <TextField
              label="Fecha"
              type="date"
              onChange={this.handleChange("fecha")}
              value={this.state.newResp.fecha}
              style={{ width: "80%" }}
            />
          )
        }}
      />
    );
  }
}

MinutaTable.propTypes = {
  responsabilidades: PropTypes.arrayOf(PropTypes.instanceOf(Responsabilidad))
    .isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  todosResponsables: PropTypes.arrayOf(PropTypes.instanceOf(Responsable))
    .isRequired
};
export default withStyles(tableStyle)(MinutaTable);
