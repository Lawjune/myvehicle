import React from "react";
import Joi from "joi-browser";

import { getDataTypes, getTypes } from "../services/fakeTypeService";
import { getSignal, saveVehicleInfoSignals } from "../services/fakeVisService";
import Form from "./common/form";
import ActivateButton from "./common/activateButton";

class SignalForm extends Form {
  state = {
    data: {
      name: "",
      desc: "",
      type: "",
      datatype: "",
      value: "",
      activated: false,
    },
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

    if (!signal.value) signal.value = "";
    if (signal.enum_list) {
      this.setState({ enumList: signal.enum_list });
    }

    if (signal.activated) this.setState({ activated: true });

    const schema = {
      _id: Joi.string().required().label("Signal ID"),
      name: Joi.string().required().label("Signal Name"),
      desc: Joi.string().label("Signal Description"),
      type: Joi.string().label("Signal Type"),
      datatype: Joi.string().label("Signal Data Type"),
      value: this.selectSchema(signal, "Signal Data Value"),
      activated: Joi.boolean().label("Signal Activation Status"),
    };
    this.setState({ schema, data: this.mapToViewModel(signal) });
  }

  selectSchema(signal, label) {
    const { datatype, max, min } = signal;
    if (datatype.includes("string")) return Joi.label(label);
    if (datatype === "boolean") {
      return Joi.number().required().integer().min(0).max(1);
    }
    if (datatype.includes("int")) {
      return Joi.number()
        .required()
        .integer()
        .min(min | (min === 0) ? min : Number.MIN_SAFE_INTEGER)
        .max(max | (max === 0) ? max : Number.MAX_VALUE)
        .label(label);
    }
    return Joi.number().required().label(label);
  }

  mapToViewModel(signal) {
    return {
      _id: signal._id,
      name: signal.name,
      desc: signal.desc,
      type: signal.type,
      datatype: signal.datatype,
      value: signal.value,
      activated: signal.activated ? signal.activated : false,
    };
  }

  doSubmit = () => {
    // Call the server
    // console.log("Submitted.");
    saveVehicleInfoSignals(this.state.data);
    // this.props.history.push("/");
  };

  renderSignalValue = () => {
    if (this.state.enumList.length > 0)
      return this.renderSelect(
        "value",
        "Select Signal Value",
        this.state.enumList
      );
    else return this.renderInput("value", "Input Signal Value", "number");
  };

  renderActivateButton = () => {
    const { activated } = this.state.data;
    // console.log("DEBUG Activate: ", activated);
    return (
      <ActivateButton
        disabled={this.validate()}
        activated={activated}
        onClick={this.handleActivate}
      />
    );
  };

  handleActivate = () => {
    const { data } = this.state;
    data.activated = !data.activated;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <h1>Signal Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Vehicle Information Signal")}
          {this.renderInput("desc", "Vehicle Information Signal Description")}
          {this.renderSelect("type", "Type", this.state.types)}
          {this.renderSelect("datatype", "Data Type", this.state.dataTypes)}
          {this.renderSignalValue()}
          {this.renderButton("Save")}
        </form>
        {this.renderActivateButton()}
      </div>
    );
  }
}

export default SignalForm;
