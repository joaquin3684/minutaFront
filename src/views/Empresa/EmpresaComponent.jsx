import React from "react";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import AbmTabla from "../../components/Abm/AbmTabla";

import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import * as httpService from "./httpServiceEmpresa";

class EmpresaComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      empresas: []
    };
  }

  componentDidMount() {
    httpService.traerTodos().then(empresas => this.setState({ empresas }));
  }

  onDelete = id => {
    httpService.baja(id).then(() => {
      const empresas = this.state.empresas.filter(e => e.id !== id);
      this.setState({ empresas });
    });
  };

  onAdd = () => {
    httpService.alta({ nombre: this.state.nombre }).then(newEmpresa => {
      const empresas = this.state.empresas.concat(newEmpresa);
      this.setState({ empresas, nombre: "" });
    });
  };

  onChange = i => field => e => {
    const empresas = this.state.empresas;
    empresas[i][field] = e.target.value;
    this.setState({ empresas });
  };

  onEdit = id => {
    const empresa = this.state.empresas.find(e => e.id === id);
    httpService.modificacion(empresa).catch(() => {
      this.onCancelEdit(empresa.id);
    });
  };

  onCancelEdit = id => {
    httpService.traerUno(id).then(empresa => {
      const empresas = this.state.empresas;
      const i = empresas.findIndex(e => e.id === id);
      empresas[i] = empresa;
      this.setState({ empresas });
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Grid container>
        <Card>
          <CardHeader color="primary">
            <h4>Crear Empresa</h4>
            <p>Complete los siguientes campos</p>
          </CardHeader>
          <CardBody>
            <AbmTabla
              onDelete={this.onDelete}
              onAdd={this.onAdd}
              onEdit={this.onEdit}
              onCancelEdit={this.onCancelEdit}
              columns={[{ name: "Empresa", value: "nombre" }]}
              rows={this.state.empresas.map((e, i) => {
                return {
                  rowData: { nombre: e.nombre, id: e.id },
                  rowChange: {
                    nombre: (
                      <TextField
                        label="Nombre"
                        onChange={this.onChange(i)("nombre")}
                        defaultValue={e.nombre}
                      />
                    )
                  }
                };
              })}
              alta={{
                nombre: (
                  <TextField
                    label="Nombre"
                    onChange={this.handleChange}
                    value={this.state.nombre}
                    name="nombre"
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

export default EmpresaComponent;
