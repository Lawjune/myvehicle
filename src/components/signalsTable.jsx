import React, { Component } from "react";
import ActivateButton from "./common/activateButton";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

class SignalsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Vehicle Information Signal",
      content: (signal) => (
        <Link to={`/vehicleSignals/${signal._id}`}>{signal.name}</Link>
      ),
    },
    { path: "type", label: "Type" },
    { path: "value", label: "Value" },
    {
      key: "like",
      content: (signal) => (
        <Like liked={signal.liked} onClick={() => this.props.onLike(signal)} />
      ),
    },
    {
      key: "activate",
      content: (signal) => (
        // <button
        //   onClick={() => this.props.onActivate(signal)}
        //   className="btn btn-danger btn-sm"
        // >
        //   Activate
        // </button>
        <ActivateButton
          activated={signal.activated}
          onClick={() => this.props.onActivate(signal)}
        />
      ),
    },
  ];

  render() {
    const { signals, onSort, sortColumn, onActivate } = this.props;

    return (
      <Table
        columns={this.columns}
        data={signals}
        onSort={onSort}
        onActivate={onActivate}
        sortColumn={sortColumn}
      />
    );
  }
}

export default SignalsTable;
