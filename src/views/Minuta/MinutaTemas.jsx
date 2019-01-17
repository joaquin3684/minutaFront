import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Tabs from "components/CustomTabs/CustomTabs.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class MinutasTemas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temaNuevo: "",
      temas: props.temas
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.temas !== props.temas) {
      return { temas: props.temas };
    }
    return null;
  }

  temaChange = event => {
    this.setState({ temaNuevo: event.target.value });
  };
  onAgregarTema = () => {
    this.props.agregarTema(this.state.temaNuevo);
    this.setState({ tema: "" });
  };
  onActualizarTema = tema => {
    this.props.actualizarTema(tema);
  };
  onBorrarTema = tema => {
    this.props.borrarTema(tema);
  };

  render() {
    return (
      <div>
        <Grid container spacing={40} style={{ padding: 50 }}>
          <Grid container item xs>
            <Grid item xs={12}>
              <h3>Alta</h3>
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "80%" }}
                label="Nombre"
                formControlProps={{ fullWidth: true }}
                name="temaNuevo"
                value={this.state.temaNuevo}
                onChange={this.temaChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                color="info"
                justIcon
                round
                style={{ fontSize: 50 + "px" }}
                type="submit"
                onClick={this.onAgregarTema}
              >
                <Icon> add</Icon>
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs>
            <MostrarModificacionTema
              temas={this.state.temas}
              onActualizarTema={this.onActualizarTema}
              onBorrarTema={this.onBorrarTema}
            />
          </Grid>
        </Grid>
        <Definiciones
          temas={this.props.temas}
          actualizarTema={this.onActualizarTema}
        />
      </div>
    );
  }
}

class MostrarModificacionTema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temaModi: null
    };
  }

  onTemaModificandoChange = e => {
    const temaModi = {
      ...this.state.temaModi,
      titulo: e.target.value
    };
    this.setState({ temaModi });
  };

  onActualizarTema = () => {
    this.props.onActualizarTema(this.state.temaModi);
    this.setState({ temaModi: null });
  };

  onBorrarTema = () => {
    this.props.onBorrarTema(this.state.temaModi);
    this.setState({ temaModi: null });
  };

  render() {
    if (this.state.temaModi) {
      return (
        <React.Fragment>
          <Grid item xs={12}>
            <h3>Edicion</h3>
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: "80%" }}
              label="Editar tema"
              id="editTema"
              value={this.state.temaModi.titulo}
              name="temaModi"
              onChange={this.onTemaModificandoChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              color="info"
              justIcon
              round
              style={{ fontSize: 50 + "px" }}
              type="submit"
              onClick={this.onActualizarTema}
            >
              <Icon> add</Icon>
            </Button>
            <Button
              color="danger"
              justIcon
              round
              style={{ fontSize: 50 + "px" }}
              type="submit"
              onClick={this.onBorrarTema}
            >
              <Icon> delete_forever</Icon>
            </Button>
          </Grid>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Grid item xs={12}>
            <h3>Edicion</h3>
          </Grid>
          <Grid xs>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="temas">Tema</InputLabel>

              <SelectConItems2
                values={this.props.temas}
                value={this.state.temaModi}
                inputProps={{
                  name: "temaModi",
                  id: "temaModi-id",
                  onChange: e => {
                    this.setState({ temaModi: e.target.value });
                  }
                }}
              />
            </FormControl>
          </Grid>
        </React.Fragment>
      );
    }
  }
}

function Definiciones(props) {
  const actualizarDefinicion = ({ definiciones, ...resto }) => definicion => {
    definiciones = definiciones.map(d =>
      d.id === definicion.id ? definicion : d
    );
    props.actualizarTema({ definiciones, ...resto });
  };
  const borrarDefinicion = ({ definiciones, ...resto }) => definicion => {
    definiciones = definiciones.filter(d => d !== definicion);
    props.actualizarTema({ definiciones, ...resto });
  };
  const agregarDefinicion = tema => definicion => {
    tema.definiciones.push(definicion);
    props.actualizarTema(tema);
  };

  return (
    <Tabs
      title="Temas:"
      headerColor="rose"
      tabs={props.temas.map(tema => ({
        tabName: tema.titulo,
        tabContent: (
          <Grid container spacing={30}>
            {tema.definiciones.map((definicion, indice) => (
              <Grid item xs={6} key={indice} style={{ padding: "30px 50px" }}>
                <Definicion
                  numero={indice + 1}
                  definicion={definicion}
                  id={definicion.id}
                  actualizarDefinicion={actualizarDefinicion(tema)}
                  borrarDefinicion={borrarDefinicion(tema)}
                  agregarDefinicion={agregarDefinicion(tema)}
                />
              </Grid>
            ))}
          </Grid>
        )
      }))}
    />
  );
}

function Definicion(props) {
  return (
    <Grid container alignItems="center" spacing={30}>
      <Grid item xs>
        <TextField
          style={{ width: "80%" }}
          label={"Definicion " + props.numero}
          id={"definicion" + props.numero}
          value={props.definicion.texto}
          onChange={e =>
            props.actualizarDefinicion({
              id: props.definicion.id,
              texto: e.target.value
            })
          }
        />
      </Grid>
      <Grid item>
        <Button
          color="info"
          justIcon
          round
          variant="contained"
          style={{ fontSize: 50 + "px" }}
          type="submit"
          onClick={() =>
            props.agregarDefinicion({ id: new Date().getTime(), texto: "" })
          }
        >
          <Icon> add</Icon>
        </Button>

        <Button
          onClick={() => props.borrarDefinicion(props.definicion)}
          color="danger"
          justIcon
          round
          style={{ fontSize: 50 + "px" }}
        >
          <Icon> delete_forever </Icon>
        </Button>
      </Grid>
    </Grid>
  );
}

function SelectConItems2(props) {
  const items = props.values.map(value => (
    <MenuItem value={value} key={value.id}>
      {value.titulo}
    </MenuItem>
  ));

  return <Select {...props}> {items} </Select>;
}

export default MinutasTemas;
