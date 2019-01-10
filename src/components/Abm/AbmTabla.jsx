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

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarEdicion: false,
      a: []
    };
  }

  getCells = () => {
    return Object.keys(this.props.data).filter(
      key => !this.props.exclude.some(excKey => excKey === key)
    );
  };

  getComponents = () => {
    return Object.keys(this.props.components)
  };

  mostrarEditables = () => {
    const mostrarEdicion = !this.state.mostrarEdicion
    this.setState({ mostrarEdicion });
  }

  showCells() {
    if (this.state.mostrarEdicion) {
      return this.props.components.map((elem, i) => {
        return(<TableCell> {React.cloneElement(elem, {inputProps:{value: this.props.data[this.getCells()[i]]}, value:this.props.data[this.getCells()[i]]})}</TableCell>)
      });
    } else {
      return this.getCells().map(elem => (
        <TableCell>{this.props.data[elem]}</TableCell>
      ));
    }
  }

  render() {
    return (
      <TableRow key={this.props.id}>
        {this.showCells()}
        <TableCell>
          <Button
            color="danger"
            justIcon
            round
            style={{ fontSize: 50 + "px" }}
            type="submit"
            onClick={() => this.props.borrarFuncion(this.props.id)}
          >
            <Icon> delete_forever</Icon>
          </Button>
          <Button
            color="info"
            justIcon
            round
            style={{ fontSize: 50 + "px" }}
            type="submit"
            onClick={this.mostrarEditables}
          >
            <Icon> edit</Icon>
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

class AbmTabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
          {this.props.rows.map(row => {
            return (
              <Row
                id={row.id}
                data={row}
                exclude={this.props.exclude}
                borrarFuncion={this.props.borrarFuncion}
                components={this.props.components}
              />
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
export default withStyles(customInputStyle)(AbmTabla);
