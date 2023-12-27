import React, { useState } from "react";
import Select from "react-select";

export default function Form() {
  const initialFormValues = {};
  const [formValues, setFormValues] = useState(initialFormValues);

  const FormData = [
    {
      name: "User Name",
      id: "UserName",
      type: "text",
    },
    {
      name: "First Name",
      id: "FirstName",
      type: "text",
    },
    {
      name: "First Name",
      id: "Country",
      type: "select",
      isMulti: false,
      options: [
        {
          label: "Hello",
          value: "Hello",
        },

        {
          label: "Hello 1",
          value: "Hello 1",
        },

        {
          label: "Hello 2",
          value: "Hello 2",
        },
      ],
    },
  ];

  const handleChange = (fieldId, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value,
    }));
  };

  const SwitchData = (data) => {
    switch (data.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={data.name}
            value={formValues[data.id] || ""}
            onChange={(e) => handleChange(data.id, e.target.value)}
          />
        );
      case "select":
        return (
          <Select
            isMulti={data.isMulti}
            name="colors"
            classNamePrefix="select"
            options={data.options}
            value={formValues[data.id] || ""}
            onChange={(selectedOption) => handleChange(data.id, selectedOption)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Form</h1>
      {FormData.map((data) => SwitchData(data))}
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </div>
  );
}
