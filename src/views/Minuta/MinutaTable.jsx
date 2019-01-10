import React from "react";
import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function getMinutas() {
  axios.get('http://localhost:8000/api/minutas/').then(resp => {
    console.log('Response', resp)
  }).catch(err => {
    console.log('Error', err.response.status)
  });

  return [
    { id:1, fecha: '2017-02-09', proyecto: 'Ventas', motivo:'Prueba', descripcion:'se esta haciendo una prueba'},
    { id:2, fecha: '2017-02-09', proyecto: 'Ventas', motivo:'Prueba', descripcion:'se esta haciendo una prueba'},
    { id:3, fecha: '2017-02-09', proyecto: 'Ventas', motivo:'Prueba', descripcion:'se esta haciendo una prueba'},
    { id:4, fecha: '2017-02-09', proyecto: 'Ventas', motivo:'Prueba', descripcion:'se esta haciendo una prueba'},
    { id:5, fecha: '2017-02-09', proyecto: 'Ventas', motivo:'Prueba', descripcion:'se esta haciendo una prueba'},
    { id:6, fecha: '2017-02-09', proyecto: 'Ventas', motivo:'Prueba', descripcion:'se esta haciendo una prueba'},
    { id:7, fecha: '2017-02-09', proyecto: 'Ventas', motivo:'Prueba', descripcion:'se esta haciendo una prueba'},
    ];
}

function parseToTable(){
  const minutas = getMinutas()
  const header = Object.keys(minutas[0])
  const data = minutas.map(minuta => Object.values(minuta))
  return {header: header, data:data}
}

function traerDatos(id){
  console.log(id)
}

function MinutaTable(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat (g)</TableCell>
                  <TableCell align="right">Carbs (g)</TableCell>
                  <TableCell align="right">Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getMinutas().map(row => {
                  return (
                    <TableRow key={row.id} onClick={() => traerDatos(row.id)}>
                      <TableCell align="right">{row.fecha}</TableCell>
                      <TableCell align="right">{row.proyecto}</TableCell>
                      <TableCell align="right">{row.motivo}</TableCell>
                      <TableCell align="right">{row.descripcion}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}

export default withStyles(tableStyle)(MinutaTable);
