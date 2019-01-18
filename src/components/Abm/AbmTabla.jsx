/* eslint-disable react/prop-types */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";

import Button from "components/CustomButtons/Button.jsx";

import Grid from "@material-ui/core/Grid";

class AbmTabla extends React.Component {
  constructor(props) {
    super(props);
    let { rows, columns, alta } = props;

    rows = rows.map(row => ({ show: "data", ...row }));
    this.state = {
      columns,
      rows,
      alta
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.rows.length !== state.rows.length ||
      props.rows.some(({ rowData }, i) => rowData !== state.rows[i].rowData)
    ) {
      let rows = props.rows.map((row, i) => ({
        show: state.rows[i] ? state.rows[i].show : "data",
        ...row
      }));
      return { rows };
    }
    return null
  }

  onEdit = row => {
    const newRows = this.state.rows;
    const index = this.state.rows.findIndex(r => r === row);
    row.show = row.show === "data" ? "edit" : "data";
    newRows[index] = row;
    this.setState({ rows: newRows });
  };

  onAdd = () => {
    this.props.onAdd();
  };

  onDelete = row => {
    this.props.onDelete(row.rowData.id);
  };

  render() {
    const { columns, rows } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={30} style={{ padding: "50px" }}>
          {Object.values(this.props.alta).map((elem, i) => (
            <Grid key={i} item xs={4}>
              {elem}
            </Grid>
          ))}
          <Grid container item xs={12} justify="flex-end">
            <Button
              color="info"
              justIcon
              round
              style={{ fontSize: 50 + "px" }}
              type="submit"
              onClick={this.onAdd}
            >
              <Icon> add</Icon>
            </Button>
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ name }) => (
                <TableCell align="center" key={name}>
                  {name}
                </TableCell>
              ))}
              <AccionesHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                {columns
                  .map(({ value }, i) => (
                    <TableCell component="th" scope="row" key={i}>
                      {r.show === "data"
                        ? r.rowData[value]
                        : r.rowChange[value]}
                    </TableCell>
                  ))
                  .concat([
                    <AccionesButtons
                      key={"accion" + r.rowData.id}
                      row={r}
                      onEdit={this.onEdit}
                      onDelete={this.onDelete}
                    />
                  ])}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

function AccionesButtons({ row, onEdit, onDelete }) {
  return (
    <TableCell align="center">
      <Fab
        size="small"
        color="secondary"
        aria-label="Add"
        onClick={() => onEdit(row)}
      >
        <Icon>edit_icon</Icon>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-label="Add"
        onClick={() => onDelete(row)}
      >
        <Icon>delete_icon</Icon>
      </Fab>
    </TableCell>
  );
}
function AccionesHeader() {
  return <TableCell align="center"> Acciones </TableCell>;
}

AbmTabla.propTypes = {
  alta: PropTypes.objectOf(PropTypes.element),
  columns: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      rowData: PropTypes.object,
      rowChange: PropTypes.objectOf(PropTypes.element),
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  onDelete: PropTypes.func
};

export default withStyles(customInputStyle)(AbmTabla);
