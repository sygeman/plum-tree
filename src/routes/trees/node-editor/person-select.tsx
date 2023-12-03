import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided) => {
    return {
      ...provided,
      ...{
        ":hover": {
          borderColor: "rgba(26, 188, 156, 1)",
        },
        borderColor: "#ccc",
      },
    };
  },
  multiValue: (provided) => {
    return {
      ...provided,
      ...{
        background: "#3498db",
        borderRadius: 3,
        boxShadow: "0 2px 3px 0 rgba(0,0,0,.075)",
      },
    };
  },
  multiValueLabel: (provided) => {
    return {
      ...provided,
      ...{
        color: "#fff",
        fontSize: 16,
        fontWeight: 300,
        padding: "3px 10px",
        textShadow: "0 1px 2px rgba(0,0,0,.2)",
      },
    };
  },
  multiValueRemove: (provided) => {
    return {
      ...provided,
      ...{
        ":hover": {
          backgroundColor: "#2980b9",
          color: "#fff",
        },
        color: "#fff",
        cursor: "pointer",
        textShadow: "0 1px 2px rgba(0,0,0,.2)",
      },
    };
  },
};

export default ({ defaultValue, inputId, onValueChange, options }) => {
  return (
    <Select
      defaultValue={defaultValue}
      inputId={inputId}
      isClearable={false}
      isSearchable
      onChange={onValueChange}
      options={options}
      styles={customStyles}
    />
  );
};
