import React from "react";

export class AbmTableHandler extends React.Component {
  constructor(props) {
    super(props);
    this.editables = props.editables;
    this.alta = props.alta;
    this.service = props.service;
    this.table = props.table;
    this.altaFunc = props.altaFunc | props.service.alta;
    this.bajaFunc = props.bajaFunc | props.service.bajaFunc;
    this.modifFunc = props.modifFunc | props.service.modificacion;
  }

  componentDidMount() {
    this.service.traerTodos().then(editables => (this.editables = editables));
  }
}
