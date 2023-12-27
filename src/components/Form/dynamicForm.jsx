import React, { useState } from "react";
import Select from "react-select";
import { FloatingLabel, Datepicker, FileInput } from "flowbite-react";

export default function Form() {
  const [formValues, setFormValues] = useState({});

  const FormData = [
    {
      name: "First Name",
      id: "firstName",
      type: "text",
    },
    {
      name: "Last Name",
      id: "LastName",
      type: "text",
    },
    {
      name: "Country Name",
      id: "country",
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
    {
      name: "Date of Birth",
      id: "dob",
      type: "date",
    },
    {
      name: "Subscribe to Newsletter",
      id: "subscribe",
      type: "checkbox",
    },
    {
      name: "Upload File",
      id: "file",
      type: "file",
    },
  ];

  const handleChange = (fieldId, value) => {
    setFormValues((prevValues) => {
      let updatedValues = { ...prevValues };

      // If the value is a date object, format it to ISO string
      if (value instanceof Date) {
        updatedValues[fieldId] = value.toISOString();
      } else {
        updatedValues[fieldId] = value;
      }

      return updatedValues;
    });
  };

  const SwitchData = (data) => {
    switch (data?.type) {
      case "text":
        return (
          <FloatingLabel
            type="text"
            variant="outlined"
            label={data?.name}
            value={formValues[data?.id] || ""}
            onChange={(e) => handleChange(data?.id, e.target.value)}
          />
        );
      case "select":
        return (
          <Select
            isMulti={data.isMulti}
            name="colors"
            classNamePrefix="select"
            options={data?.options}
            value={formValues[data?.id] || ""}
            onChange={(selectedOption) =>
              handleChange(data?.id, selectedOption)
            }
          />
        );
      case "date":
        return (
          <Datepicker
            label={data?.name}
            onSelectedDateChanged={(date) => {
              handleChange(data.id, date);
            }}
            renderValue={(date) =>
              date
                ? date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""
            }
          />
        );

      case "file":
        return (
          <FileInput
            label={data?.name}
            onChange={(files) => handleChange(data?.id, files)}
          />
        );

      default:
        return null;
    }
  };

  console.log("formValues", formValues);

  return (
    <div style={{ width: "400px" }} className="">
      <div className="">
        {FormData.map((data) => (
          <div className="p-[10px]" key={data.id}>
            {SwitchData(data)}
          </div>
        ))}
      </div>
      <div>
        {JSON.stringify(
          {
            firstName: formValues.firstName,
            LastName: formValues.LastName,
            // Add other properties as needed
          },
          null,
          2
        )}
      </div>
    </div>
  );
}
