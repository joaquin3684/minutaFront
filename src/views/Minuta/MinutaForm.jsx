import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import * as moment from "moment";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";

import MinutaTable from "./MinutaTable";
import { Responsabilidad, Responsable } from "./modelos";
import MinutaStepper from "./MinutaStepper";
import MinutaDetalles from "./MinutaDetalles";
import MinutaTemas from "./MinutaTemas";

class MinutaForm extends React.Component {
  constructor(props) {
    super(props);
    const asistentes = [
      new Responsable("Pablo Jordan", 1),
      new Responsable("Lucas Blanco", 2),
      new Responsable("Feliu Jordan", 3),
      new Responsable("Matias Balart", 4)
    ];
    this.state = {
      asistentes: asistentes,
      activeStep: 0,
      proyecto: "",
      temas: [],
      fecha: moment()
        .toISOString()
        .slice(0, 10),
      motivo: "",
      descripcion: "",
      responsabilidades: [
        new Responsabilidad(
          [asistentes[0], asistentes[1]],
          "comprar 234queso",
          "2018-02-04",
          new Date().getTime()
        ),
        new Responsabilidad(
          [asistentes[0], asistentes[1]],
          "comprar 234queso",
          "2018-02-04",
          new Date().getTime() + 1
        ),
        new Responsabilidad(
          [asistentes[0], asistentes[1]],
          "comprar 234queso",
          "2018-02-04",
          new Date().getTime() + 2
        )
      ],
      responsables: []
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  actualizarTema = tema => {
    const temas = this.state.temas.map(t => (t.id === tema.id ? tema : t));
    this.setState({ temas }, () =>
      console.log("Actualizacion", this.state.temas)
    );
  };

  agregarTema = titulo => {
    const nuevoTema = {
      id: new Date().getTime(),
      titulo,
      definiciones: [
        { id: new Date().getTime(), texto: "Escriba una definicion" }
      ]
    };
    this.setState({ temas: this.state.temas.concat(nuevoTema) });
  };

  borrarTema = tema => {
    const temas = this.state.temas.filter(t => t.id !== tema.id);
    this.setState({ temas });
  };

  agregarAsis = e => {
    this.setState({
      asistentes: e.target.value,
      responsables: this.state.responsables.concat(
        e.target.value.map(val => ({
          name: val.name,
          id: new Date().getTime()
        }))
      )
    });
  };

  handleChangeResp = index => field => event => {
    let newResp = this.state.responsabilidades;
    newResp[index][field] = event.target.value;
    this.setState({ responsabilidades: newResp });
  };

  handleDeleteResp = idResponsabilidad => {
    let responsabilidades = this.state.responsabilidades;
    responsabilidades = responsabilidades.filter(
      r => r.id !== idResponsabilidad
    );
    this.setState({ responsabilidades });
  };
  handleAddResp = responsabilidad => {
    const responsabilidades = this.state.responsabilidades.concat([
      responsabilidad
    ]);
    this.setState({ responsabilidades });
  };

  handleChangeStep = step => {
    this.setState({ activeStep: step });
  };
  render() {
    let step = null;
    switch (this.state.activeStep) {
      case 0:
        step = (
          <MinutaDetalles
            handleChange={this.handleChange}
            fecha={this.state.fecha}
            proyecto={this.state.proyecto}
            motivo={this.state.motivo}
            descripcion={this.state.descripcion}
            agregarAsis={this.agregarAsis}
            asistentes={this.state.asistentes}
          />
        );
        break;
      case 1:
        step = (
          <MinutaTemas
            agregarTema={this.agregarTema}
            temas={this.state.temas}
            actualizarTema={this.actualizarTema}
            borrarTema={this.borrarTema}
          />
        );
        break;
      case 2:
        step = (
          <MinutaTable
            onEdit={this.handleChangeResp}
            onDelete={this.handleDeleteResp}
            onAdd={this.handleAddResp}
            responsabilidades={this.state.responsabilidades}
            todosResponsables={this.state.asistentes}
          />
        );
        break;
      default:
        step = null;
        break;
    }
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
                <MinutaStepper
                  activeStep={this.state.activeStep}
                  onChangeStep={this.handleChangeStep}
                />
                {step}
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

/*altaMinuta = () => {
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
};*/
