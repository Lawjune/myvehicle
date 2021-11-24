import React from "react";
import Joi from "joi-browser";

import Select from "./select";
import Input from "./input";

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
    schema: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.state.schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.state.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // disabled={this.validate()}

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton = (label) => {
    // console.log("DEBUG JOI: ", this.validate());
    return (
      <div className="formField">
        <button disabled={this.validate()} className="btn btn-primary">
          {label}
        </button>
      </div>
    );
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <div className="formField">
        <Select
          name={name}
          value={data[name]}
          label={label}
          options={options}
          onChange={this.handleChange}
          error={errors[name]}
        />
      </div>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <div className="formField">
        <Input
          type={type}
          name={name}
          label={label}
          value={data[name]}
          onChange={this.handleChange}
          error={errors[name]}
        />
      </div>
    );
  }
}

export default Form;
