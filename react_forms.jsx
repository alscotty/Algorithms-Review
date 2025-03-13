import React, { useCallback, useState, useEffect } from "react";

import "./App.css";

// -- WELCOME! --
// X is working on a flexible “Form” component as 
// part of a larger component library that allows app developers
// to quickly stand up forms for their different needs. This 
// component should be flexible enough to handle different views
// from developers across our company. 
// Let’s build a quick prototype of that Form component today.
// -- END PROMPT! --

// Part 1: Form Schema Definition
// How would the interface for a form look? Be sure to cover use
// cases like different field types and validations.
// key - fieldname, value - data type, string, number etc. ranges for numbers, etc. 

const formSchema = {
  "description": {
    type: 'string',
    minLength: 10,
    maxLength: 0,
  },
  "rating": {
    type: 'number',
    upperLimit: 10,
    lowerLimit: 0,
    // css stuff
  },
  // "colors": {
  //   options: ['red', 'yellow, green'],
  //   type: 'dropdown',
  // }
}

// Part 2: Let's build our form component
// Let's try to hit a few of the use cases from above
const CustomForm = ({ formSchema, onSubmit }) => {
  const [formData, setFormData] = useState(formSchema);
  // { name:value}, just ref schema as we go
  

  const updateField = (e, inputName) => {
    let newValue = e.target.value;
    let nameValues = formData[inputName]

    setFormData({
      ...formData,
      [inputName]: {
        ...nameValues,
        value: newValue
      }
    }
    )
  }

  const validateFields = (e, formData, onSubmitCallback) => {
    // data checks
    {
      Object.keys(formData).map(inputName => {
        const inputSettings = formData[inputName];
        // const { value } = 
        if (inputSettings.type == 'string') {

        }
      });
      // all checks pass:
      onSubmitCallback(e, formData);
    }

    if (!formData) return;

    return (
      <div>
        <form onSubmit={(e) => validateFields(e, formData, onSubmit)}>
          {Object.keys(formData).map(inputName => {
            const inputSettings = formData[inputName];

            return (
              <div key={inputName}>
                {inputName}
                <input type={inputSettings.type} name={inputName} value={inputSettings?.value || ''} onChange={(e) => updateField(e, inputName)}> 
                </input>
              </div>
            )
          })}
          <button type='submit'>
            Submit Form
          </button>
        </form>
      </div>
    );
  };

  const App = () => {
    const onSubmit = useCallback((e, obj) => {
      e.preventDefault();
      console.log(`Submitting form!`)
      console.log(obj)

      let formattedData = {}
      Object.keys(obj).forEach(fieldName => {
        if (obj[fieldName]?.value) {
          formattedData[fieldName] = obj[fieldName].value;
        }
      })
      console.log(formattedData);
      // { name: value }
      // api, etc.
    }, []);

    return (
      <div className="page-container">
        <div className="main-container">
          <div className="form-container">
            <CustomForm formSchema={formSchema} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    );
  };

  export default App;