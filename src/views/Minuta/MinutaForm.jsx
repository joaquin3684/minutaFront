import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import * as moment from "moment";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import Divider from "@material-ui/core/Divider/Divider";
import Icon from "@material-ui/core/Icon";
import Tabs from "components/CustomTabs/CustomTabs.jsx";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import AbmTabla from "components/Abm/AbmTabla.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  item: {
    marginTop: "10px"
  }
};

function SelectConItems(props) {
  const items = props.values.map(value => (
    <MenuItem value={value.id} key={value.id}>
      {value.name}
    </MenuItem>
  ));
  return <Select {...props}> {items} </Select>;
}

function SelectConItems2(props) {
  const items = props.values.map(value => (
    <MenuItem value={value} key={value.id}>
      {value.titulo}
    </MenuItem>
  ));

  return <Select {...props}> {items} </Select>;
}

function DemoTabs({ ...props }) {
  return (
    <Tabs
      title="Temas:"
      headerColor="rose"
      tabs={props.temas.map(tema => ({
        tabName: tema.titulo,
        tabContent: tema.definiciones.map((definicion, indice) => (
          <Definicion
            numero={indice + 1}
            texto={definicion.texto}
            id={definicion.id}
            idTema={tema.id}
            actualizarDefinicion={props.actualizarDefinicion}
            borrarDefinicion={props.borrarDefinicion}
            agregarDefinicion={props.agregarDefinicion}
          />
        ))
      }))}
    />
  );
}

/*class Responsabilidades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsables: [],
      fecha: "",
      tarea: "",
      mostrarEdicion: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  mostrarEdicion = () => {
    if(this.state.mostrarEdicion)
    {

    }

  }


  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Responsables</TableCell>
            <TableCell align="right">Tarea</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.responsabilidades.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell  style={{maxWidth: 10}}>
                  {row.responsables.map(r => r.name).toString()}
                </TableCell>
                <TableCell align="right" style={{maxWidth: 10}}>{row.tarea}</TableCell>
                <TableCell align="right" style={{maxWidth: 10}}>{row.fecha}</TableCell>
                <TableCell align="right" style={{maxWidth: 10}}>
                  <Button
                    color="danger"
                    justIcon
                    round
                    style={{ fontSize: 50 + "px" }}
                    type="submit"
                    onClick={() => this.props.borrarResponsabilidad(row.id)}
                  >
                    <Icon> delete_forever</Icon>
                  </Button>
                  <Button
                    color="info"
                    justIcon
                    round
                    style={{ fontSize: 50 + "px" }}
                    type="submit"
                    onClick={() => this.props.borrarResponsabilidad(row.id)}
                  >
                    <Icon> edit</Icon>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="responsables">Asistentes</InputLabel>
                <SelectConItems
                  values={this.props.responsables}
                  autoWidth={true}
                  onChange={this.handleChange}
                  value={this.state.responsables}
                  inputProps={{
                    name: "responsables",
                    id: "asistentes-id",
                    value: this.state.responsables
                  }}
                  multiple={true}
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <CustomInput
                labelText="Tarea"
                id="Tarea"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "tarea",
                  value: this.state.tarea,
                  onChange: this.handleChange
                }}
              />
            </TableCell>
            <TableCell>
              <CustomInput
                labelText="Fecha"
                id="Fecha"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "fecha",
                  type: "date",
                  value: this.state.fecha,
                  onChange: this.handleChange
                }}
              />
            </TableCell>
            <TableCell>
              <Button
                color="info"
                justIcon
                round
                style={{ fontSize: 50 + "px" }}
                type="submit"
                onClick={() =>{
                  this.props.agregarResponsabilidad(
                    this.state.responsables,
                    new Date().getTime(),
                    this.state.fecha,
                    this.state.tarea
                  )
                  this.setState({responsables: [], fecha:"", tarea:""})
                }
                }
              >
                <Icon> add</Icon>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}*/

function Definicion(props) {
  return (
    <React.Fragment>
      <GridContainer alignItems="center">
        <GridItem xs={10} sm={10} md={10}>
          <CustomInput
            labelText={"Definicion " + props.numero}
            id={"definicion" + props.numero}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: props.texto,
              onChange: e =>
                props.actualizarDefinicion(props.id, e.target.value)
            }}
          />
        </GridItem>
        <GridItem xs={2} sm={2} md={2}>
          <Button
            color="info"
            justIcon
            round
            variant="contained"
            style={{ fontSize: 50 + "px" }}
            type="submit"
            onClick={() => props.agregarDefinicion(props.idTema)}
          >
            <Icon> add</Icon>
          </Button>

          <Button
            onClick={() => props.borrarDefinicion(props.id)}
            color="danger"
            justIcon
            round
            style={{ fontSize: 50 + "px" }}
          >
            <Icon> delete_forever </Icon>
          </Button>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
}

class MinutaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asistentes: [],
      proyecto: "",
      temas: [],
      temaActual: "",
      fecha: moment()
        .toISOString()
        .slice(0, 10),
      motivo: "",
      descripcion: "",
      temaModi: { titulo: "", id: "" },
      responsabilidades: [
        {
          reponsables: [1,2],
          tarea: "comprar 234queso",
          fecha: "2018-02-04",
          id: 3
        },
        {
          reponsables: "pepe234, Martin",
          tarea: "comprarsdfg queso",
          fecha: "2018-02-04",
          id: 4
        },
        {
          reponsables: "pepe432, Martin",
          tarea: "comprarsdfg queso",
          fecha: "2018-02-04",
          id: 5
        },
        {
          reponsables: "pepe, 234Martin",
          tarea: "comprar sdfgqueso",
          fecha: "2018-02-04",
          id: 6
        },
        {
          reponsables: "pepe, 234Martin",
          tarea: "comprar sdfgsdfqueso",
          fecha: "2018-02-04",
          id: 7
        },
        {
          reponsables: "pepe, 432Martin",
          tarea: "comprar gsdfgqueso",
          fecha: "2018-02-04",
          id: 8
        }
      ],
      responsables: []
    };
  }

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

  getResponsables() {
    return [
      { name: "Joaquin Mazoud", id: 5 },
      { name: "Lucas Blanco", id: 6 }
    ].concat(this.getAsistentes());
  }
  actualizarDefinicion = (idDefinicion, textoNuevo) => {
    const temasActualizados = this.state.temas.map(
      ({ definiciones, ...resto }) => ({
        definiciones: definiciones.map(
          ({ id, texto }) =>
            id == idDefinicion ? { id, textoNuevo } : { id, texto }
        ),
        ...resto
      })
    );
    this.setState({ temas: temasActualizados });
  };

  mostrarModificacionTema() {
    const { classes } = this.props;

    if (this.state.temaModi.titulo !== "") {
      return (
        <React.Fragment>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Editar tema"
              id="editTema"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.temaModi.titulo,
                name: "temaModi",
                onChange: e => {
                  const temaModi = {
                    id: this.state.temaModi.id,
                    titulo: e.target.value
                  };
                  this.setState({ temaModi });
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button
              color="info"
              justIcon
              round
              style={{ fontSize: 50 + "px" }}
              type="submit"
              onClick={this.actualizarTema}
            >
              <Icon> add</Icon>
            </Button>
            <Button
              color="danger"
              justIcon
              round
              style={{ fontSize: 50 + "px" }}
              type="submit"
              onClick={this.borrarTema}
            >
              <Icon> delete_forever</Icon>
            </Button>
          </GridItem>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <GridItem xs={12} sm={12} md={4}>
            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel htmlFor="temas">Tema</InputLabel>

              <SelectConItems2
                values={this.state.temas.map(tema => ({
                  titulo: tema.titulo,
                  id: tema.id
                }))}
                value={this.state.temaModi}
                inputProps={{
                  name: "temaModi",
                  id: "temaModi-id",
                  onChange: e => {
                    this.setState({ temaModi: e.target.value });
                  },
                  value: this.state.temaModi
                }}
              />
            </FormControl>
          </GridItem>
        </React.Fragment>
      );
    }
  }

  altaMinuta = () => {
    axios
      .post("http://localhost:8000/api/minutas/", {
        fecha: "2018-02-03",
        proyecto: 2,
        motivo: "quesito",
        descripcion: "asdf",
        asistentes: [1, 2],
        temas: [
          {
            titulo: "queso2",
            definiciones: [
              {
                texto: "asdf 123"
              },
              {
                texto: "asf 312"
              }
            ]
          },
          {
            titulo: "queso23",
            definiciones: [
              {
                texto: "asdf 122"
              },
              {
                texto: "asdf 124"
              }
            ]
          }
        ]
      })
      .then(resp => {
        console.log("Response", resp);
      })
      .catch(err => {
        console.log("Error", err.response.status);
      });
  };

  borrarDefinicion = idDefinicion => {
    const temasActualizados = this.state.temas.map(
      ({ definiciones, ...resto }) => ({
        definiciones: definiciones.filter(
          definicion => definicion.id !== idDefinicion
        ),
        ...resto
      })
    );
    this.setState({ temas: temasActualizados });
  };

  agregarDefinicion = idTema => {
    const temaActualizado = this.state.temas.map(
      ({ id, definiciones, ...resto }) =>
        id == idTema
          ? {
              id,
              definiciones: definiciones.concat([
                { id: new Date().getTime(), texto: "Escriba la definicion" }
              ]),
              ...resto
            }
          : { id, definiciones, ...resto }
    );
    this.setState({ temas: temaActualizado });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  actualizarTema = () => {
    const temas = this.state.temas.map(
      ({ titulo, id, ...resto }) =>
        id == this.state.temaModi.id
          ? { titulo: this.state.temaModi.titulo, id, ...resto }
          : { titulo, id, ...resto }
    );
    this.setState({ temas: temas, temaModi: { titulo: "", id: "" } });
  };

  temaNuevoChange = event => {
    this.setState({ temaActual: event.target.value });
  };

  agregarTema = e => {
    const nuevoTema = {
      id: new Date().getTime(),
      titulo: this.state.temaActual,
      definiciones: [
        { id: new Date().getTime(), texto: "Escriba una definicion" }
      ]
    };
    this.setState({ temas: this.state.temas.concat(nuevoTema) });
    console.log("agregar tema " + this.state.temas);
  };

  borrarTema = () => {
    const temas = this.state.temas.filter(
      tema => tema.id !== this.state.temaModi.id
    );
    this.setState({ temas: temas, temaModi: { titulo: "", id: "" } });
  };

  agregarAsis = e => {
    console.log(e.target.value);
    console.log(this.state);
    this.setState(
      {
        asistentes: e.target.value,
        responsables: this.state.responsables.concat(
          e.target.value.map(val => ({
            name: val.name,
            id: new Date().getTime()
          }))
        )
      },
      () => console.log(this.state)
    );
  };

  agregarResponsabilidad = (responsables, id, fecha, tarea) => {
    const resps = this.getResponsables().filter(resp =>
      responsables.some(r => r === resp.id)
    );
    this.setState({
      responsabilidades: this.state.responsabilidades.concat({
        id: id,
        fecha: fecha,
        tarea: tarea,
        responsables: resps
      })
    });
  };

  borrarResponsabilidad = id => {
    const responsabilidades = this.state.responsabilidades.filter(
      responsabilidad => responsabilidad.id !== id
    );
    this.setState({ responsabilidades });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Crear Minuta</h4>
                <p>Complete los siguientes campos</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Fecha"
                      id="fecha"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "date",
                        value: this.state.fecha,
                        name: "fecha",
                        onChange: this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      className={classes.formControl}
                      fullWidth={true}
                    >
                      <InputLabel htmlFor="proyecto">Proyecto</InputLabel>

                      <SelectConItems
                        values={this.getProyectos()}
                        value={this.state.proyecto}
                        inputProps={{
                          name: "proyecto",
                          id: "proyecto-id",
                          onChange: this.handleChange,
                          value: this.state.proyecto
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Motivo"
                      id="motivo"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Relevamiento clientes",
                        name: "motivo",
                        onChange: this.handleChange,
                        value: this.state.motivo
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Descripcion"
                      id="descripcion"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        onChange: this.handleChange,
                        value: this.state.descripcion
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl
                      className={classes.formControl}
                      fullWidth={true}
                    >
                      <InputLabel htmlFor="asistentes">Asistentes</InputLabel>
                      <SelectConItems
                        values={this.getAsistentes()}
                        autoWidth={true}
                        onChange={this.agregarAsis}
                        inputProps={{
                          name: "asistentes",
                          id: "asistentes-id",
                          value: this.state.asistentes
                        }}
                        multiple={true}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <Divider variant="middle" />
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Crear tema"
                      id="crearTema"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        name: "temaNuevo",
                        id: "temaNuevo",
                        value: this.state.temaActual,
                        onChange: this.temaNuevoChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <Button
                      color="info"
                      justIcon
                      round
                      style={{ fontSize: 50 + "px" }}
                      type="submit"
                      onClick={this.agregarTema}
                    >
                      <Icon> add</Icon>
                    </Button>
                  </GridItem>
                  {this.mostrarModificacionTema()}
                </GridContainer>
                <GridContainer>
                  <DemoTabs
                    temas={this.state.temas}
                    actualizarDefinicion={this.actualizarDefinicion}
                    actualizarTema={this.actualizarTema}
                    borrarTema={this.borrarTema}
                    borrarDefinicion={this.borrarDefinicion}
                    agregarDefinicion={this.agregarDefinicion}
                  />
                </GridContainer>
                <GridContainer style={{ overflowX: "auto" }}>
                  <GridItem xs={12} sm={12} md={12}>
                    <AbmTabla
                      rows={this.state.responsabilidades}
                      exclude={["id"]}
                      borrarFuncion={this.borrarResponsabilidad}
                      editarFuncion={this.editarResponsabilidad}
                      components={[

                          <SelectConItems
                            values={this.getResponsables()}
                            autoWidth={true}
                            onChange={this.handleChange}
                            value={[this.state.responsables]}
                            inputProps={{
                              name: "responsables",
                              id: "asistentes-id",
                            }}
                            multiple={true}
                          />
                        ,
                        <CustomInput
                          labelText="Tarea"
                          id="Tarea"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "tarea",
                            onChange: this.handleChange
                          }}
                        />,

                        <CustomInput
                          labelText="Fecha"
                          id="Fecha"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "fecha",
                            type: "date",
                            onChange: this.handleChange
                          }}
                        />
                      ]}
                    />


                    {/*<Responsabilidades
                      responsabilidades={this.state.responsabilidades}
                      responsables={this.getResponsables()}
                      agregarResponsabilidad={this.agregarResponsabilidad}
                      borrarResponsabilidad={this.borrarResponsabilidad}
                    />*/}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.altaMinuta}>
                  Crear minuta
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(customInputStyle)(MinutaForm);
