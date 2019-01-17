import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class MinutaDetalles extends React.Component {
  getProyectos() {
    return [
      { name: "Farmacia", id: 1 },
      { name: "Mutual", id: 2 },
      { name: "Gestionar", id: 3 },
      { name: "Ventas", id: 4 }
    ];
  }

  getAsistentes() {
    return [
      { name: "Pablo Jordan", id: 1 },
      { name: "Pablo Canadell", id: 2 },
      { name: "Feliu Jordan", id: 3 },
      { name: "Matias Balart", id: 4 }
    ];
  }

  render() {
    return (
      <div>
        <Grid container spacing={40} style={{ padding: 50 }}>
          <Grid item xs>
            <TextField
              style={{ width: "80%" }}
              label="Fecha"
              id="fecha"
              value={this.props.fecha}
              name="fecha"
              onChange={this.props.handleChange}
            />
          </Grid>
          <Grid item xs>
            <FormControl style={{ width: "80%" }}>
              <InputLabel htmlFor="proyecto">Proyecto</InputLabel>

              <SelectConItems
                values={this.getProyectos()}
                value={this.props.proyecto}
                inputProps={{
                  name: "proyecto",
                  id: "proyecto-id",
                  onChange: this.props.handleChange,
                  value: this.props.proyecto
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField
              style={{ width: "80%" }}
              label="Motivo"
              id="motivo"
              name="motivo"
              onChange={this.props.handleChange}
              value={this.props.motivo}
            />
          </Grid>
        </Grid>
        <Grid container spacing={40} style={{ padding: 50 }}>
          <Grid item xs>
            <TextField
              style={{ width: "80%" }}
              label="Descripcion"
              id="descripcion"
              multiline={true}
              rows={5}
              name="descripcion"
              onChange={this.props.handleChange}
              value={this.props.descripcion}
            />
          </Grid>
          <Grid item xs>
            <FormControl style={{ width: "80%" }}>
              <InputLabel htmlFor="asistentes">Asistentes</InputLabel>
              <SelectConItems
                values={this.getAsistentes()}
                autoWidth={true}
                onChange={this.props.agregarAsis}
                inputProps={{
                  name: "asistentes",
                  id: "asistentes-id",
                  value: this.props.asistentes
                }}
                multiple={true}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function SelectConItems(props) {
  const items = props.values.map(value => (
    <MenuItem value={value.id} key={value.id}>
      {value.name}
    </MenuItem>
  ));
  return <Select {...props}> {items} </Select>;
}

export default withStyles(styles)(MinutaDetalles);
