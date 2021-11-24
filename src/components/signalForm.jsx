import React from "react";
import Joi from "joi-browser";

import { getDataTypes, getTypes } from "../services/fakeTypeService";
import { getSignal } from "../services/fakeVisService";
import Form from "./common/form";

class SignalForm extends Form {
  state = {
    data: { name: "", typeId: "", dataTypeId: "", value: "" },
    errors: {},
    schema: {},
    types: [],
    dataTypes: [],
    enumList: [],
  };

  componentDidMount() {
    const types = getTypes();
    this.setState({ types });
    const dataTypes = getDataTypes();
    this.setState({ dataTypes });

    const signalId = this.props.match.params.id;
    if (signalId === "new") return;

    const signal = getSignal(signalId);
    if (!signal) return this.props.history.replace("/not-found");

    if (signal.enum_list) {
      if (!signal.value) signal.value = "";
      this.setState({ enumList: signal.enum_list });
    }

    const schema = {
      name: Joi.string().required().label("Signal Name"),
      type: Joi.label("Signal Type"),
      dataType: Joi.label("Signal Data Type"),
      value: this.selectSchema(signal.datatype, "Signal Data Value"),
    };
    this.setState({ schema, data: this.mapToViewModel(signal) });
  }

  selectSchema(dataType, label) {
    // const label = "Signal Data Value";
    if (dataType.toLowerCase().includes("string")) return Joi.label(label);
    else return Joi.number().required().label(label);
  }

  mapToViewModel(signal) {
    return {
      _id: signal._id,
      name: signal.name,
      type: signal.type,
      dataType: signal.datatype,
      value: signal.value,
    };
  }

  doSubmit = () => {
    console.log("TODO: doSubmit()");
  };

  renderSignalValue = () => {
    if (this.state.enumList)
      return this.renderSelect("value", "Signal Value", this.state.enumList);
    else return this.renderInput("value", "Signal Value");
  };

  render() {
    return (
      <div>
        <h1>Signal Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Vehicle Information Signal")}
          {this.renderSelect("type", "Type", this.state.types)}
          {this.renderSelect("dataType", "Data Type", this.state.dataTypes)}
          {this.renderSignalValue()}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default SignalForm;
